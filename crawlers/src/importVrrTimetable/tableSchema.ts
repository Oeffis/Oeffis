
export interface TableSchema {
  name: string;
  csv: string;
  foreignKeys: ForeignKey[];
  primaryKey?: string;
  determineFieldType?: (field: string) => string;
  extraFields?: string[];
  extraSqlInCreateTable?: string;
}

export interface ForeignKey {
  columns: string[];
  referencedColumns: string[];
  referencedTable: string;
}

function asNullableField(fields: string[]): TableSchema["determineFieldType"] {
  return (field) => {
    if (fields.includes(field)) {
      return "TEXT";
    }
    return "TEXT NOT NULL";
  };
}

function addVrrTimetableVersionIdField(schema: TableSchema): TableSchema {
  const primaryKeyData = schema.primaryKey ? {
    primaryKey: undefined,
    extraSqlInCreateTable:
      (schema.extraSqlInCreateTable ?? "") + ", PRIMARY KEY (" + schema.primaryKey + ", vrr_timetable_version_id)"
  } : {};

  return {
    ...schema,
    extraFields: [
      "vrr_timetable_version_id"
    ],
    determineFieldType: (field) => {
      if (field === "vrr_timetable_version_id") {
        return "integer NOT NULL";
      }

      if (schema.determineFieldType) {
        return schema.determineFieldType(field);
      }
      return "TEXT NOT NULL";
    },
    foreignKeys: [
      ...schema.foreignKeys.map((fk) => ({
        ...fk,
        columns: [...fk.columns, "vrr_timetable_version_id"],
        referencedColumns: [...fk.referencedColumns, "vrr_timetable_version_id"]
      })),
      {
        columns: ["vrr_timetable_version_id"],
        referencedColumns: ["vrr_timetable_version_id"],
        referencedTable: "vrr_timetable_version"
      }
    ],
    ...primaryKeyData
  };
}

export const TABLE_SCHEMAS: TableSchema[] = [
  {
    name: "agency",
    csv: "agency.txt",
    foreignKeys: [],
    primaryKey: "agency_id",
    determineFieldType: asNullableField(["agency_phone", "agency_fare_url", "agency_email"])
  },
  {
    name: "calendar",
    csv: "calendar.txt",
    foreignKeys: [],
    primaryKey: "service_id"
  },
  {
    name: "calendar_dates",
    csv: "calendar_dates.txt",
    foreignKeys: []
  },
  {
    name: "feed_info",
    csv: "feed_info.txt",
    foreignKeys: []
  },
  {
    name: "routes",
    csv: "routes.txt",
    foreignKeys: [
      {
        columns: ["agency_id"],
        referencedColumns: ["agency_id"],
        referencedTable: "agency"
      }
    ],
    primaryKey: "route_id",
    determineFieldType: asNullableField(["NVBW_DLID", "route_color", "route_text_color", "route_long_name"])
  },
  {
    name: "shapes",
    csv: "shapes.txt",
    foreignKeys: [],
    primaryKey: "shape_id"
  },
  {
    name: "stops",
    csv: "stops.txt",
    foreignKeys: [
      {
        columns: ["parent_station"],
        referencedColumns: ["stop_id"],
        referencedTable: "stops"
      }
    ],
    primaryKey: "stop_id",
    determineFieldType: asNullableField(["stop_code", "stop_url", "location_type", "parent_station", "platform_code", "wheelchair_boarding", "NVBW_HST_DHID"])
  },
  {
    name: "stop_times",
    csv: "stop_times.txt",
    foreignKeys: [
      {
        columns: ["stop_id"],
        referencedColumns: ["stop_id"],
        referencedTable: "stops"
      }
    ],
    determineFieldType: asNullableField(["stop_headsign", "shape_dist_traveled"])
  },
  {
    name: "transfers",
    csv: "transfers.txt",
    foreignKeys: [
      {
        columns: ["from_stop_id"],
        referencedColumns: ["stop_id"],
        referencedTable: "stops"
      },
      {
        columns: ["to_stop_id"],
        referencedColumns: ["stop_id"],
        referencedTable: "stops"
      }
    ],
    determineFieldType: asNullableField(["min_transfer_time"])
  },
  {
    name: "trips",
    csv: "trips.txt",
    foreignKeys: [
      {
        columns: ["route_id"],
        referencedColumns: ["route_id"],
        referencedTable: "routes"
      },
      {
        columns: ["service_id"],
        referencedColumns: ["service_id"],
        referencedTable: "calendar"
      },
      {
        columns: ["shape_id"],
        referencedColumns: ["shape_id"],
        referencedTable: "shapes"
      }
    ],
    primaryKey: "trip_id",
    determineFieldType: asNullableField(["shape_id", "trip_headsign", "trip_short_name"])
  }
].map(addVrrTimetableVersionIdField);
