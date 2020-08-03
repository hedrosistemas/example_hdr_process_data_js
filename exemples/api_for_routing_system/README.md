# HDR POSTBACK SYSTEM

## DESCRIPTION

O Sistema de roteamento de mensagens da Hedro possibilita a integração fácil da coleta de dados dos sensores H1 com uma API REST.

As mensagens enviadas para a API seguem o modelo detalhado nos JSON abaixo.

Para poder interpretar os dados "roteados" basta utilizar a biblioteca de processamento de dados da Hedro, como bem mostra no <a href="https://github.com/hedrosistemas/hdr_process_data_js/blob/master/exemples/api_for_routing_system/src/postback.controller.js">exemplo</a>.

Vale ressaltar que os sensores da Hedro trabalham com o padrão de Beacon, desta forma em algumas configurações de coleta os sensores fazem o envio de vários pacotes que na verdade correspondem a um único pedido de coleta. Nestes casos pode ocorrer de alguns pacotes serem perdidos durante o processo de coleta das mensagens. Os pacotes que são perdidos são representados como uma sequencia de bytes "gggg...". Desta forma a biblioteca de processamento de dados ao tentar processar estes dados que foram perdidos retornara "NaN".

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
            "time": "string", // timestamps in Seconds on GMT 0
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
            "time": "1595936680", // timestamps in Seconds on GMT 0
          },
          {
            "mac": "4548AA000002",
            "rssi": "-87",
            "raw": "03F60072887878CA",
            "time": "1595936682", // timestamps in Seconds on GMT 0
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
            "time": "1595936680", // timestamps in Seconds on GMT 0
          },
          {
            "mac": "4548AA000002",
            "rssi": "-87",
            "raw": "034c010601ba",
            "time": "1595936682", // timestamps in Seconds on GMT 0
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
            "time": "1595936680", // timestamps in Seconds on GMT 0
          },
          {
            "mac": "4548AA000002",
            "rssi": "-87",
            "raw": "03120485b001D92E",
            "time": "1595936682", // timestamps in Seconds on GMT 0
          }
        ]
      }
    ],
  }
  ```
