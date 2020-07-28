# HDR POSTBACK SYSTEM

## POST BODY FORMAT

```javascript
HTTPS POST {
    "body": [
      {
        "type": "health" | "temp" | "tempMMM" | "rms2" | "rmms" | "tilt" | "fft" | "accRaw",
        "data": [
          {
            "mac": "string",
            "rssi": "string",
            "raw": "string",
            "time": "string", // timestamps On Seconds
          }
        ]
      },
    ]
   }
```

## POST BODY FORMAT EXAMPLE

```javascript
HTTPS POST {
    "body": [
      {
        "type": "health",
        "data": [
          {
            "mac": "4548AA000001",
            "rssi": "-87",
            "raw": "03F60072887777CA",
            "time": "1595936680", // timestamps On Seconds
          },
          {
            "mac": "4548AA000002",
            "rssi": "-87",
            "raw": "03F60072887878CA",
            "time": "1595936682", // timestamps On Seconds
          }
        ]
      },
      {
        "type": "temp",
        "data": [
          {
            "mac": "4548AA000001",
            "rssi": "-87",
            "raw": "034c011603ba07b607b207",
            "time": "1595936680", // timestamps On Seconds
          },
          {
            "mac": "4548AA000002",
            "rssi": "-87",
            "raw": "034c010601ba",
            "time": "1595936682", // timestamps On Seconds
          }
        ]
      },
      {
        "type": "rmms",
        "data": [
          {
            "mac": "4548AA000001",
            "rssi": "-87",
            "raw": "030d048501050d04040406",
            "time": "1595936680", // timestamps On Seconds
          },
          {
            "mac": "4548AA000002",
            "rssi": "-87",
            "raw": "03120485b001D92E",
            "time": "1595936682", // timestamps On Seconds
          }
        ]
      }
    ],
  }
  ```
