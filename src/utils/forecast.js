const request = require("request");

const forecast = (a, b, callback) => {
  const url ='http://api.weatherstack.com/current?access_key=42c1de7d8838cbebc4ee4327217714f6&query=' + a + ',' +b;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to forecast services", undefined);
    } else if (body.error) {
      callback("Unable to locate the location.", undefined);
    } else {
      const data = body.current.weather_descriptions +
        ". It is " +
        body.current.temperature +
        " degress. It feels like " +
        body.current.feelslike +
        " degrees.";
      callback(undefined, data);
    }
  });
};

module.exports = forecast;
