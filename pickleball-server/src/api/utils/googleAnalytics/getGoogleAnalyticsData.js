import { BetaAnalyticsDataClient } from '@google-analytics/data';
import globalConfig from '../../../config/globalConfig.js';
// import credentials from "./sanpickleball-2874c58ee993.json";
// import credentials from "./sanpickleball-2874c58ee993.json" with type: "json"
// import fs from "fs";
// const credentials = JSON.parse(
//   fs.readFileSync(new URL("./sanpickleball-2874c58ee993.json", import.meta.url), "utf8")
// );
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const credentials = require("./sanpickleball-2874c58ee993.json");
import moment from 'moment';

const getGoogleAnalyticsData = async () => {

  const analyticsDataClient = new BetaAnalyticsDataClient(
    { credentials: credentials }
  );

  const oneWeekAgo = moment().subtract(7, 'days').format('YYYY-MM-DD');

  const [response] = await analyticsDataClient.runReport({
    property: `properties/${globalConfig.googleAnalytics.googleAnalyticsPropertyId}`,
    dateRanges: [
      {
        startDate: oneWeekAgo,
        endDate: 'today',
      },
    ],
    dimensions: [
      {
        name: 'pagePath',
      },
    ],
    metrics: [
      {
        name: 'totalUsers',
      },
    ],
    dimensionFilter: {
      filter: {
        fieldName: 'pagePath',
        stringFilter: { matchType: 'CONTAINS', value: '/tim-san/' },
      },
    }
  });

  const data = response.rows.map(row => {
    return {
      path: row?.dimensionValues[0]?.value,
      value: row?.metricValues[0]?.value
    }
  });
  // console.log('data43434', data);
  return data;
}
export default getGoogleAnalyticsData;
