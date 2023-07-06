/* eslint-disable */
import axios from "axios";
import { writeFile } from "fs/promises";
import { Parser } from "xml2js";
import { TimetablesService } from "./src/api/timetables";

axios.interceptors.request.use((config) => {
    config.headers["DB-Client-Id"] = process.env["DBClientId"];
    config.headers["DB-API-Key"] = process.env["DBAPIKey"];

    return config;
});

const parser = new Parser({
    mergeAttrs: true
});

async function run(): Promise<void> {
    const date = (new Date().getFullYear() + "").substring(2) + (new Date().getMonth() + 1 + "").padStart(2, "0") + (new Date().getDate() + "").padStart(2, "0");
    const hour = (new Date().getHours() + "").padStart(2, "0");
    const timetableOriginal = await TimetablesService.getPlan(hour, "8000118", date);
    const timetable = (await parser.parseStringPromise(timetableOriginal)).timetable;

    await writeFile("timetable.json", JSON.stringify(timetable));
    const timetableChangesOriginal = await TimetablesService.getFchg("8000118");
    const timetableChanges = (await parser.parseStringPromise(timetableChangesOriginal)).timetable;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const delayedStopps = new Map<string, any>();
    for (const stopp of (timetableChanges.s || [])) {
        delayedStopps.set(stopp.id[0], stopp);
    }

    console.log("Departures/Arrivals in: '" + (timetableChanges.station || [])[0] + "'");
    for (const stopp of (timetable.s || [])) {
        const delayedStopp = delayedStopps.get(stopp.id[0]);
        const titleEntry = (stopp.tl as unknown as any)[0];
        const title = titleEntry.c + " " + titleEntry.n;

        const trainInfo = getTrainInfo(stopp, "Gelsenkirchen Hbf");
        const timeInfo = getChangeInfo(stopp, delayedStopp);
        console.log(trainInfo.padEnd(50) + timeInfo);

    }
}

function getTrainInfo(stopp: any, station: string): string {
    const title = stopp.tl[0];
    const number = title.n[0];
    const kind = title.c[0];
    let finalDestination = station;

    if (stopp.dp) {
        const departure = stopp.dp[0];
        const path = (stopp.dp)[0].ppth[0];
        finalDestination = path.slice(path.lastIndexOf("|") + 1);
    }

    const line = getLine(stopp);
    const lineName = kind + " " + line;
    let name = lineName.padEnd(10) + "(" + number + ")";
    return `${name.padEnd(20)} nach ${finalDestination}`;
}

function getLine(stopp: any): string {
    const info = (stopp.dp || stopp.ar)[0];
    if (info.l) {
        return info.l[0];
    }
    return stopp.tl[0].n[0];
}

function getChangeInfo(stopp: any, changedStopp: any): string {
    const time = (stopp.dp || stopp.ar)[0].pt[0];
    const timeInfo = time.slice(6);
    const timeString = timeInfo.slice(0, 2) + ":" + timeInfo.slice(2);
    if (changedStopp) {
        let change = "";
        const info = (changedStopp.dp || changedStopp.ar)[0];
        if (info.ct) {
            const newDateTime = info.ct[0];
            const newTime = newDateTime.slice(6);
            const newTimeParse = parseInt(newTime);
            const oldTimeParse = parseInt(timeInfo);
            const diff = newTimeParse - oldTimeParse;
            change = `+${diff} min`;

            if (diff == 0) {
                change = "nach Plan";
            }
        } else if (info.clt) {
            change = "fällt aus";
        } else {
            change = "unbekannt";
        }

        const text = changedStopp.dp ? "Abfahrt" : "Ankunft";
        return `${text} ${timeString.padEnd(6)} (${change})`;
    }
    const text = stopp.dp ? "Abfahrt" : "Ankunft";
    return `${text} ${timeString.padEnd(6)} (nach Plan)`;
}

void run();
