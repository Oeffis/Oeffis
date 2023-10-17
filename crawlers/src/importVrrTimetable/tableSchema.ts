
export interface TableSchema {
  name: string;
  csv: string;
  foreignKeys: ForeignKey[];
  primaryKey?: string;
  determineFieldType?: (field: string) => string;
}

export interface ForeignKey {
  column: string;
  referencedColumn: string;
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
        column: "agency_id",
        referencedColumn: "agency_id",
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
        column: "parent_station",
        referencedColumn: "stop_id",
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
        column: "stop_id",
        referencedColumn: "stop_id",
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
        column: "from_stop_id",
        referencedColumn: "stop_id",
        referencedTable: "stops"
      },
      {
        column: "to_stop_id",
        referencedColumn: "stop_id",
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
        column: "route_id",
        referencedColumn: "route_id",
        referencedTable: "routes"
      },
      {
        column: "service_id",
        referencedColumn: "service_id",
        referencedTable: "calendar"
      },
      {
        column: "shape_id",
        referencedColumn: "shape_id",
        referencedTable: "shapes"
      }
    ],
    primaryKey: "trip_id",
    determineFieldType: asNullableField(["shape_id", "trip_headsign", "trip_short_name"])
  }
];
