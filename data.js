const routes = [
    {
        "name": "East Coast Main Line",
        "code": "ECML",
        "length_yards": 595826,
        "sections": [
            {
                "from": 0,
                "to": 281902,
                "elr": "ECM1",
                "offset": 0
            },
            {
                "from": 281902,
                "to": 297781,
                "elr": "ECM2",
                "offset": 0
            },
            {
                "from": 297781,
                "to": 322052,
                "elr": "ECM3",
                "offset": 0
            },
            {
                "from": 322052,
                "to": 331781,
                "elr": "ECM4",
                "offset": 0
            },
            {
                "from": 331781,
                "to": 472692,
                "elr": "ECM5",
                "offset": 331782
            },
            {
                "from": 472692,
                "to": 472942,
                "elr": "ECM6",
                "offset": 331782
            },
            {
                "from": 472942,
                "to": 595826,
                "elr": "ECM7",
                "offset": 472930
            }
        ],
        "tracks": [
            {
                "tid": 3600,
                "altRoute": null,
                "fromConnection": {
                    "type": "buffer_stop",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 459,
                    "track": 3101,
                    "sc_name": "5041",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 35,
                        "to": 349,
                        "yFrom": 55,
                        "yTo": 55,
                        "electrification": "overhead"
                    },
                    {
                        "from": 349,
                        "to": 459,
                        "yFrom": 55,
                        "yTo": 52,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 3601,
                "altRoute": null,
                "fromConnection": {
                    "type": "buffer_stop",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 459,
                    "track": 3101,
                    "sc_name": "5041",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 22,
                        "to": 329,
                        "yFrom": 54,
                        "yTo": 54,
                        "electrification": "overhead"
                    },
                    {
                        "from": 329,
                        "to": 459,
                        "yFrom": 54,
                        "yTo": 52,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 3706,
                "altRoute": null,
                "fromConnection": {
                    "type": "junction",
                    "at": 359,
                    "track": 3601,
                    "sc_name": "5006A",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 419,
                    "track": 3102,
                    "sc_name": "5006B",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 359,
                        "to": 419,
                        "yFrom": null,
                        "yTo": null,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 3602,
                "altRoute": null,
                "fromConnection": {
                    "type": "buffer_stop",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 419,
                    "track": 3102,
                    "sc_name": "5006B",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 20,
                        "to": 329,
                        "yFrom": 53,
                        "yTo": 53,
                        "electrification": "overhead"
                    },
                    {
                        "from": 329,
                        "to": 419,
                        "yFrom": 53,
                        "yTo": 51,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 3700,
                "altRoute": null,
                "fromConnection": {
                    "type": "junction",
                    "at": 418826,
                    "track": 1100,
                    "sc_name": "750A",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 418921,
                    "track": 2100,
                    "sc_name": "750B",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 418826,
                        "to": 418921,
                        "yFrom": null,
                        "yTo": null,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 3603,
                "altRoute": null,
                "fromConnection": {
                    "type": "buffer_stop",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 469,
                    "track": 3103,
                    "sc_name": "5058",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 22,
                        "to": 329,
                        "yFrom": 52,
                        "yTo": 52,
                        "electrification": "overhead"
                    },
                    {
                        "from": 329,
                        "to": 469,
                        "yFrom": 52,
                        "yTo": 50,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 3604,
                "altRoute": null,
                "fromConnection": {
                    "type": "buffer_stop",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 428,
                    "track": 3105,
                    "sc_name": "5035",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 22,
                        "to": 349,
                        "yFrom": 51,
                        "yTo": 51,
                        "electrification": "overhead"
                    },
                    {
                        "from": 349,
                        "to": 428,
                        "yFrom": 51,
                        "yTo": 50,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 3605,
                "altRoute": null,
                "fromConnection": {
                    "type": "buffer_stop",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 469,
                    "track": 3103,
                    "sc_name": "5058",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 33,
                        "to": 469,
                        "yFrom": 50,
                        "yTo": 50,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 3712,
                "altRoute": null,
                "fromConnection": {
                    "type": "junction",
                    "at": 359,
                    "track": 3605,
                    "sc_name": "5012A",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 424,
                    "track": 3606,
                    "sc_name": "5012B",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 359,
                        "to": 424,
                        "yFrom": null,
                        "yTo": null,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "altRoute": null,
                "fromConnection": null,
                "tid": 3606,
                "toConnection": {
                    "type": "junction",
                    "at": 461,
                    "track": 3104,
                    "sc_name": "5052",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 33,
                        "to": 461,
                        "yFrom": 49,
                        "yTo": 49,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 3718,
                "altRoute": null,
                "fromConnection": {
                    "type": "junction",
                    "at": 359,
                    "track": 3607,
                    "sc_name": "5018",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 461,
                    "track": 3104,
                    "sc_name": "5052",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 359,
                        "to": 461,
                        "yFrom": null,
                        "yTo": null,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 3607,
                "altRoute": null,
                "fromConnection": {
                    "type": "buffer_stop",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 450,
                    "track": 3105,
                    "sc_name": "5024B",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 32,
                        "to": 450,
                        "yFrom": 48,
                        "yTo": 48,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 3724,
                "altRoute": null,
                "fromConnection": {
                    "type": "junction",
                    "at": 387,
                    "track": 3608,
                    "sc_name": "5024A",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 450,
                    "track": 3105,
                    "sc_name": "5024B",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 387,
                        "to": 450,
                        "yFrom": null,
                        "yTo": null,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 3608,
                "altRoute": null,
                "fromConnection": {
                    "type": "buffer_stop",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 461,
                    "track": 3106,
                    "sc_name": "5047",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 32,
                        "to": 461,
                        "yFrom": 47,
                        "yTo": 47,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 3609,
                "altRoute": null,
                "fromConnection": {
                    "type": "buffer_stop",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 410,
                    "track": 3610,
                    "sc_name": "5029",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 158,
                        "to": 410,
                        "yFrom": 46,
                        "yTo": 46,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 3610,
                "altRoute": null,
                "fromConnection": {
                    "type": "buffer_stop",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 461,
                    "track": 3106,
                    "sc_name": "5047",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 162,
                        "to": 380,
                        "yFrom": 45,
                        "yTo": 45,
                        "electrification": "overhead"
                    },
                    {
                        "from": 380,
                        "to": 410,
                        "yFrom": 45,
                        "yTo": 46,
                        "electrification": "overhead"
                    },
                    {
                        "from": 410,
                        "to": 461,
                        "yFrom": 46,
                        "yTo": 47,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 3101,
                "altRoute": null,
                "fromConnection": null,
                "toConnection": null,
                "shape": [
                    {
                        "from": 459,
                        "to": 884,
                        "yFrom": 52,
                        "yTo": 52,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 3775,
                "altRoute": null,
                "fromConnection": {
                    "type": "junction",
                    "at": 884,
                    "track": 3101,
                    "sc_name": "5075A",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 994,
                    "track": 3102,
                    "sc_name": "5075B",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 884,
                        "to": 994,
                        "yFrom": null,
                        "yTo": null,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 3102,
                "altRoute": null,
                "fromConnection": null,
                "toConnection": null,
                "shape": [
                    {
                        "from": 419,
                        "to": 449,
                        "yFrom": 52,
                        "yTo": 51,
                        "electrification": "overhead"
                    },
                    {
                        "from": 449,
                        "to": 1100,
                        "yFrom": 51,
                        "yTo": 51,
                        "electrification": "overhead"
                    },
                    {
                        "from": 1100,
                        "to": 1208,
                        "yFrom": 51,
                        "yTo": 50,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 3103,
                "altRoute": null,
                "fromConnection": null,
                "toConnection": null,
                "shape": [
                    {
                        "from": 469,
                        "to": 1253,
                        "yFrom": 50,
                        "yTo": 50,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 3763,
                "altRoute": null,
                "fromConnection": {
                    "type": "junction",
                    "at": 598,
                    "track": 3103,
                    "sc_name": "5063A",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 742,
                    "track": 3104,
                    "sc_name": "5063B",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 598,
                        "to": 742,
                        "yFrom": null,
                        "yTo": null,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 3781,
                "altRoute": null,
                "fromConnection": {
                    "type": "junction",
                    "at": 881,
                    "track": 3104,
                    "sc_name": "5081A",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 990,
                    "track": 3103,
                    "sc_name": "5081B",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 881,
                        "to": 990,
                        "yFrom": null,
                        "yTo": null,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "altRoute": null,
                "fromConnection": null,
                "toConnection": null,
                "tid": 3104,
                "shape": [
                    {
                        "from": 461,
                        "to": 1664,
                        "yFrom": 49,
                        "yTo": 49,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 3786,
                "altRoute": null,
                "fromConnection": {
                    "type": "junction",
                    "at": 1019,
                    "track": 3105,
                    "sc_name": "5086",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 1208,
                    "track": 3104,
                    "sc_name": "5097",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 1019,
                        "to": 1208,
                        "yFrom": null,
                        "yTo": null,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 3105,
                "altRoute": null,
                "fromConnection": null,
                "toConnection": null,
                "shape": [
                    {
                        "from": 450,
                        "to": 1285,
                        "yFrom": 48,
                        "yTo": 48,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 3770,
                "altRoute": null,
                "fromConnection": {
                    "type": "junction",
                    "at": 587,
                    "track": 3106,
                    "sc_name": "5070A",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 687,
                    "track": 3105,
                    "sc_name": "5070B",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 587,
                        "to": 687,
                        "yFrom": null,
                        "yTo": null,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 3106,
                "altRoute": null,
                "fromConnection": null,
                "toConnection": null,
                "shape": [
                    {
                        "from": 461,
                        "to": 1456,
                        "yFrom": 47,
                        "yTo": 47,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 1101,
                "altRoute": null,
                "fromConnection": {
                    "type": "fixed",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 141,
                    "track": 1100,
                    "sc_name": "5119",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 884,
                        "to": 1300,
                        "yFrom": 52,
                        "yTo": 52,
                        "electrification": "overhead"
                    },
                    {
                        "from": 1300,
                        "to": 1414,
                        "yFrom": 52,
                        "yTo": 50,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "altRoute": null,
                "fromConnection": null,
                "toConnection": null,
                "tid": 1100,
                "shape": [
                    {
                        "from": 1253,
                        "to": 331254,
                        "yFrom": 50,
                        "yTo": 50,
                        "electrification": "overhead"
                    },
                    {
                        "from": 331254,
                        "to": 331298,
                        "yFrom": 50,
                        "yTo": 52,
                        "electrification": "overhead"
                    },
                    {
                        "from": 331298,
                        "to": 331814,
                        "yFrom": 52,
                        "yTo": 52,
                        "electrification": "overhead"
                    },
                    {
                        "from": 331814,
                        "to": 331858,
                        "yFrom": 52,
                        "yTo": 50,
                        "electrification": "overhead"
                    },
                    {
                        "from": 331858,
                        "to": 595826,
                        "yFrom": 50,
                        "yTo": 50,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "toConnection": null,
                "tid": 3804,
                "altRoute": {
                    "elr": "YMS",
                    "showAltRuler": false
                },
                "fromConnection": {
                    "type": "junction",
                    "at": 331814,
                    "track": 1100,
                    "sc_name": "801",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 331814,
                        "to": 332222,
                        "yFrom": null,
                        "yTo": 52,
                        "electrification": "none"
                    }
                ]
            },
            {
                "tid": 3704,
                "altRoute": null,
                "fromConnection": {
                    "type": "junction",
                    "at": 1253,
                    "track": 1100,
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 1375,
                    "track": 3104,
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 1253,
                        "to": 1375,
                        "yFrom": null,
                        "yTo": null,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 1200,
                "altRoute": null,
                "fromConnection": null,
                "toConnection": {
                    "type": "junction",
                    "at": 37748,
                    "track": 1100,
                    "sc_name": "5562",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 1285,
                        "to": 2030,
                        "yFrom": 48,
                        "yTo": 48,
                        "electrification": "overhead"
                    },
                    {
                        "from": 2030,
                        "to": 2245,
                        "yFrom": 48,
                        "yTo": 51,
                        "electrification": "overhead"
                    },
                    {
                        "from": 2245,
                        "to": 37704,
                        "yFrom": 51,
                        "yTo": 51,
                        "electrification": "overhead"
                    },
                    {
                        "from": 37704,
                        "to": 37748,
                        "yFrom": 51,
                        "yTo": null,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 2713,
                "altRoute": null,
                "fromConnection": {
                    "type": "junction",
                    "at": 1285,
                    "track": 1200,
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 1377,
                    "track": 3106,
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 1285,
                        "to": 1377,
                        "yFrom": null,
                        "yTo": null,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "altRoute": null,
                "fromConnection": null,
                "tid": 2200,
                "toConnection": {
                    "type": "junction",
                    "at": 37351,
                    "track": 2100,
                    "sc_name": "5561B",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 1456,
                        "to": 2200,
                        "yFrom": 47,
                        "yTo": 47,
                        "electrification": "overhead"
                    },
                    {
                        "from": 2200,
                        "to": 2290,
                        "yFrom": 47,
                        "yTo": 48,
                        "electrification": "overhead"
                    },
                    {
                        "from": 2290,
                        "to": 37195,
                        "yFrom": 48,
                        "yTo": 48,
                        "electrification": "overhead"
                    },
                    {
                        "from": 37195,
                        "to": 37351,
                        "yFrom": 48,
                        "yTo": null,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 1730,
                "altRoute": null,
                "fromConnection": {
                    "type": "junction",
                    "at": 1456,
                    "track": 2200,
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 1563,
                    "track": 1200,
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 1456,
                        "to": 1563,
                        "yFrom": null,
                        "yTo": null,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 1734,
                "altRoute": null,
                "fromConnection": {
                    "type": "junction",
                    "at": 1664,
                    "track": 2100,
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 1751,
                    "track": 1100,
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 1664,
                        "to": 1751,
                        "yFrom": null,
                        "yTo": null,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 2100,
                "altRoute": null,
                "fromConnection": null,
                "toConnection": null,
                "shape": [
                    {
                        "from": 1664,
                        "to": 595826,
                        "yFrom": 49,
                        "yTo": 49,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 3700,
                "altRoute": null,
                "fromConnection": {
                    "type": "junction",
                    "at": 2514,
                    "track": 2100,
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 2673,
                    "track": 2200,
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 2514,
                        "to": 2673,
                        "yFrom": null,
                        "yTo": null,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 3701,
                "altRoute": null,
                "fromConnection": {
                    "type": "junction",
                    "at": 2619,
                    "track": 1100,
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 2718,
                    "track": 1200,
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 2619,
                        "to": 2718,
                        "yFrom": null,
                        "yTo": null,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 3700,
                "altRoute": null,
                "fromConnection": {
                    "type": "junction",
                    "at": 2743,
                    "track": 1200,
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 2888,
                    "track": 1100,
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 2743,
                        "to": 2888,
                        "yFrom": null,
                        "yTo": null,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 3700,
                "altRoute": null,
                "fromConnection": {
                    "type": "junction",
                    "at": 3014,
                    "track": 2200,
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 3165,
                    "track": 2100,
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 3014,
                        "to": 3165,
                        "yFrom": null,
                        "yTo": null,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 2300,
                "altRoute": null,
                "fromConnection": {
                    "type": "junction",
                    "at": 3155,
                    "track": 2200,
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "fixed",
                    "at": null,
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 3155,
                        "to": 3200,
                        "yFrom": 48,
                        "yTo": 47,
                        "electrification": "overhead"
                    },
                    {
                        "from": 3200,
                        "to": 3508,
                        "yFrom": 47,
                        "yTo": 47,
                        "electrification": "overhead"
                    },
                    {
                        "from": 3508,
                        "to": 3740,
                        "yFrom": 47,
                        "yTo": 45,
                        "electrification": "overhead"
                    },
                    {
                        "from": 3740,
                        "to": 4100,
                        "yFrom": 45,
                        "yTo": 45,
                        "electrification": "overhead"
                    },
                    {
                        "from": 4100,
                        "to": 4140,
                        "yFrom": 45,
                        "yTo": 46,
                        "electrification": "overhead"
                    },
                    {
                        "from": 4140,
                        "to": 4787,
                        "yFrom": 46,
                        "yTo": 46,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 3300,
                "altRoute": {
                    "elr": "CRF1",
                    "showAltRuler": false
                },
                "fromConnection": null,
                "toConnection": {
                    "type": "junction",
                    "at": 1424,
                    "track": 3106,
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 1300,
                        "to": 1424,
                        "yFrom": 44,
                        "yTo": null,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 1100,
                "altRoute": {
                    "elr": "CBI",
                    "showAltRuler": false
                },
                "fromConnection": {
                    "type": "junction",
                    "at": 1227,
                    "track": 3106,
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 1278,
                    "track": 3105,
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 1227,
                        "to": 1278,
                        "yFrom": null,
                        "yTo": null,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 1100,
                "altRoute": {
                    "elr": "CBI",
                    "showAltRuler": false
                },
                "fromConnection": null,
                "toConnection": {
                    "type": "junction",
                    "at": 1227,
                    "track": 3106,
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 1100,
                        "to": 1227,
                        "yFrom": 46,
                        "yTo": null,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 2100,
                "altRoute": {
                    "elr": "CBI",
                    "showAltRuler": false
                },
                "fromConnection": null,
                "toConnection": {
                    "type": "junction",
                    "at": 1279,
                    "track": 3106,
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 1100,
                        "to": 1279,
                        "yFrom": 45,
                        "yTo": null,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 3700,
                "altRoute": null,
                "fromConnection": {
                    "type": "junction",
                    "at": 3286,
                    "track": 1100,
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 3420,
                    "track": 1200,
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 3286,
                        "to": 3420,
                        "yFrom": null,
                        "yTo": null,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 1202,
                "altRoute": null,
                "fromConnection": {
                    "type": "junction",
                    "at": 3309,
                    "track": 1200,
                    "connectionLink": null
                },
                "toConnection": null,
                "shape": [
                    {
                        "from": 3309,
                        "to": 3400,
                        "yFrom": null,
                        "yTo": 52,
                        "electrification": "overhead"
                    },
                    {
                        "from": 3400,
                        "to": 3666,
                        "yFrom": 52,
                        "yTo": 52,
                        "electrification": "overhead"
                    },
                    {
                        "from": 3666,
                        "to": 3819,
                        "yFrom": 52,
                        "yTo": 54,
                        "electrification": "overhead"
                    },
                    {
                        "from": 3819,
                        "to": 4270,
                        "yFrom": 54,
                        "yTo": 54,
                        "electrification": "overhead"
                    },
                    {
                        "from": 4270,
                        "to": 4320,
                        "yFrom": 54,
                        "yTo": 52,
                        "electrification": "overhead"
                    },
                    {
                        "from": 4320,
                        "to": 8921,
                        "yFrom": 52,
                        "yTo": 52,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 2101,
                "altRoute": null,
                "fromConnection": null,
                "toConnection": {
                    "type": "junction",
                    "at": 5032,
                    "track": 2200,
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 4235,
                        "to": 4990,
                        "yFrom": 47,
                        "yTo": 47,
                        "electrification": "overhead"
                    },
                    {
                        "from": 4990,
                        "to": 5032,
                        "yFrom": 47,
                        "yTo": 48,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 3700,
                "altRoute": null,
                "fromConnection": {
                    "type": "junction",
                    "at": 4705,
                    "track": 2101,
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 4787,
                    "track": 2252,
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 4705,
                        "to": 4787,
                        "yFrom": null,
                        "yTo": null,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 2252,
                "altRoute": null,
                "fromConnection": null,
                "toConnection": {
                    "type": "junction",
                    "at": 8640,
                    "track": 2200,
                    "sc_name": "2142B",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 4787,
                        "to": 5060,
                        "yFrom": 46,
                        "yTo": 46,
                        "electrification": "overhead"
                    },
                    {
                        "from": 5060,
                        "to": 5100,
                        "yFrom": 46,
                        "yTo": 47,
                        "electrification": "overhead"
                    },
                    {
                        "from": 5100,
                        "to": 6358,
                        "yFrom": 47,
                        "yTo": 47,
                        "electrification": "overhead"
                    },
                    {
                        "from": 6358,
                        "to": 6420,
                        "yFrom": 47,
                        "yTo": 45,
                        "electrification": "overhead"
                    },
                    {
                        "from": 6420,
                        "to": 7216,
                        "yFrom": 45,
                        "yTo": 45,
                        "electrification": "overhead"
                    },
                    {
                        "from": 7216,
                        "to": 7260,
                        "yFrom": 45,
                        "yTo": 47,
                        "electrification": "overhead"
                    },
                    {
                        "from": 7260,
                        "to": 8529,
                        "yFrom": 47,
                        "yTo": 47,
                        "electrification": "overhead"
                    },
                    {
                        "from": 8529,
                        "to": 8640,
                        "yFrom": 47,
                        "yTo": null,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 2100,
                "altRoute": {
                    "elr": "HDB",
                    "showAltRuler": false
                },
                "fromConnection": {
                    "type": "junction",
                    "at": 8529,
                    "track": 2252,
                    "sc_name": "2142A",
                    "elr": "ECM1",
                    "connectionLink": null
                },
                "toConnection": null,
                "shape": [
                    {
                        "from": 8529,
                        "to": 9130,
                        "yFrom": null,
                        "yTo": 47,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 3703,
                "altRoute": null,
                "fromConnection": {
                    "type": "junction",
                    "at": 4821,
                    "track": 2252,
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 4888,
                    "track": 2101,
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 4821,
                        "to": 4888,
                        "yFrom": null,
                        "yTo": null,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 3702,
                "altRoute": null,
                "fromConnection": {
                    "type": "junction",
                    "at": 4810,
                    "track": 2200,
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 4933,
                    "track": 2100,
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 4810,
                        "to": 4933,
                        "yFrom": null,
                        "yTo": null,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 3701,
                "altRoute": null,
                "fromConnection": {
                    "type": "junction",
                    "at": 4605,
                    "track": 2200,
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 4680,
                    "track": 2101,
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 4605,
                        "to": 4680,
                        "yFrom": null,
                        "yTo": null,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 3795,
                "altRoute": null,
                "fromConnection": {
                    "type": "junction",
                    "at": 4656,
                    "track": 1100,
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 4719,
                    "track": 2100,
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 4656,
                        "to": 4719,
                        "yFrom": null,
                        "yTo": null,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 3701,
                "altRoute": null,
                "fromConnection": {
                    "type": "junction",
                    "at": 4829,
                    "track": 1200,
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 4933,
                    "track": 1100,
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 4829,
                        "to": 4933,
                        "yFrom": null,
                        "yTo": null,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 3700,
                "altRoute": null,
                "fromConnection": {
                    "type": "junction",
                    "at": 4865,
                    "track": 1202,
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 4943,
                    "track": 1200,
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 4865,
                        "to": 4943,
                        "yFrom": null,
                        "yTo": null,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 2100,
                "altRoute": {
                    "elr": "MEB1",
                    "showAltRuler": false
                },
                "fromConnection": null,
                "toConnection": null,
                "shape": [
                    {
                        "from": 3740,
                        "to": 4235,
                        "yFrom": 47,
                        "yTo": 47,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 2100,
                "altRoute": {
                    "elr": "CFP",
                    "showAltRuler": false
                },
                "fromConnection": null,
                "toConnection": null,
                "shape": [
                    {
                        "from": 3740,
                        "to": 4140,
                        "yFrom": 46,
                        "yTo": 46,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 3700,
                "altRoute": {
                    "elr": "CFP",
                    "showAltRuler": false
                },
                "fromConnection": null,
                "toConnection": null,
                "shape": [
                    {
                        "from": 3750,
                        "to": 3840,
                        "yFrom": 46,
                        "yTo": 45,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 3702,
                "altRoute": null,
                "fromConnection": {
                    "type": "junction",
                    "at": 4162,
                    "track": 2300,
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 4235,
                    "track": 2101,
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 4162,
                        "to": 4235,
                        "yFrom": 46,
                        "yTo": 45,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 3701,
                "altRoute": null,
                "fromConnection": null,
                "toConnection": {
                    "type": "junction",
                    "at": 4203,
                    "track": 2200,
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 4106,
                        "to": 4203,
                        "yFrom": 47,
                        "yTo": 48,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 1100,
                "altRoute": {
                    "elr": "MEB1",
                    "showAltRuler": false
                },
                "fromConnection": null,
                "toConnection": {
                    "type": "junction",
                    "at": 4312,
                    "track": 1200,
                    "elr": "ECM1",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 3784,
                        "to": 4250,
                        "yFrom": 52,
                        "yTo": 52,
                        "electrification": "overhead"
                    },
                    {
                        "from": 4250,
                        "to": 4312,
                        "yFrom": 52,
                        "yTo": null,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 1100,
                "altRoute": {
                    "elr": "CFP",
                    "showAltRuler": false
                },
                "fromConnection": null,
                "toConnection": {
                    "type": "junction",
                    "at": 4244,
                    "track": 1100,
                    "elr": "MEB1",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 3784,
                        "to": 4220,
                        "yFrom": 53,
                        "yTo": 53,
                        "electrification": "overhead"
                    },
                    {
                        "from": 4220,
                        "to": 4244,
                        "yFrom": 53,
                        "yTo": null,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 3700,
                "altRoute": null,
                "fromConnection": {
                    "type": "junction",
                    "at": 4147,
                    "track": 1100,
                    "elr": "CFP",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 4226,
                    "track": 1202,
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 4147,
                        "to": 4226,
                        "yFrom": null,
                        "yTo": null,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 3700,
                "altRoute": {
                    "elr": "CFP",
                    "showAltRuler": false
                },
                "fromConnection": {
                    "type": "junction",
                    "at": 3864,
                    "track": 1100,
                    "elr": "MEB1",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 3994,
                    "track": 1100,
                    "elr": "CFP",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 3864,
                        "to": 3994,
                        "yFrom": null,
                        "yTo": null,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 3802,
                "altRoute": null,
                "fromConnection": {
                    "type": "buffer",
                    "at": 5362,
                    "connectionLink": null
                },
                "toConnection": null,
                "shape": [
                    {
                        "from": 5362,
                        "to": 6312,
                        "yFrom": 53,
                        "yTo": 53,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 3700,
                "altRoute": null,
                "fromConnection": {
                    "type": "junction",
                    "at": 5741,
                    "track": 1200,
                    "sc_name": "2102A",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 5811,
                    "track": 1202,
                    "sc_name": "2102B",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 5741,
                        "to": 5811,
                        "yFrom": null,
                        "yTo": null,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 3701,
                "altRoute": null,
                "fromConnection": {
                    "type": "junction",
                    "at": 5741,
                    "track": 1202,
                    "sc_name": "2103A",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 5810,
                    "track": 3802,
                    "sc_name": "2103B",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 5741,
                        "to": 5810,
                        "yFrom": null,
                        "yTo": null,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 3700,
                "altRoute": null,
                "fromConnection": {
                    "type": "junction",
                    "at": 5824,
                    "track": 1202,
                    "sc_name": "2103A",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 5894,
                    "track": 3802,
                    "sc_name": "2103B",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 5824,
                        "to": 5894,
                        "yFrom": null,
                        "yTo": null,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 3801,
                "altRoute": null,
                "fromConnection": {
                    "type": "junction",
                    "at": 5823,
                    "track": 5966,
                    "sc_name": "2104",
                    "connectionLink": null
                },
                "toConnection": null,
                "shape": [
                    {
                        "from": 5823,
                        "to": 5865,
                        "yFrom": 53,
                        "yTo": 54,
                        "electrification": "overhead"
                    },
                    {
                        "from": 5865,
                        "to": 6000,
                        "yFrom": 54,
                        "yTo": 54,
                        "electrification": "overhead"
                    },
                    {
                        "from": 6000,
                        "to": 6040,
                        "yFrom": 54,
                        "yTo": 55,
                        "electrification": "overhead"
                    },
                    {
                        "from": 6040,
                        "to": 6273,
                        "yFrom": 55,
                        "yTo": 55,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 3701,
                "altRoute": null,
                "fromConnection": {
                    "type": "junction",
                    "at": 5904,
                    "track": 3802,
                    "sc_name": "2107A",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 5966,
                    "track": 3801,
                    "sc_name": "2107B",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 5904,
                        "to": 5966,
                        "yFrom": null,
                        "yTo": null,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 3700,
                "altRoute": null,
                "fromConnection": {
                    "type": "junction",
                    "at": 5948,
                    "track": 3802,
                    "sc_name": "2108A",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 6031,
                    "track": 1202,
                    "sc_name": "2108B",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 5948,
                        "to": 6031,
                        "yFrom": null,
                        "yTo": null,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 3800,
                "altRoute": null,
                "fromConnection": {
                    "type": "junction",
                    "at": 5969,
                    "track": 3801,
                    "sc_name": "2109",
                    "connectionLink": null
                },
                "toConnection": null,
                "shape": [
                    {
                        "from": 5969,
                        "to": 6050,
                        "yFrom": null,
                        "yTo": 56,
                        "electrification": "overhead"
                    },
                    {
                        "from": 6050,
                        "to": 6192,
                        "yFrom": 56,
                        "yTo": 56,
                        "electrification": "overhead"
                    },
                    {
                        "from": 6192,
                        "to": 6406,
                        "yFrom": 56,
                        "yTo": 47,
                        "electrification": "overhead"
                    },
                    {
                        "from": 6406,
                        "to": 6620,
                        "yFrom": 47,
                        "yTo": 47,
                        "electrification": "overhead"
                    },
                    {
                        "from": 6620,
                        "to": 6660,
                        "yFrom": 47,
                        "yTo": 46,
                        "electrification": "overhead"
                    },
                    {
                        "from": 6660,
                        "to": 6790,
                        "yFrom": 46,
                        "yTo": 46,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 3901,
                "altRoute": {
                    "elr": "HDS",
                    "showAltRuler": false
                },
                "fromConnection": null,
                "toConnection": null,
                "shape": [
                    {
                        "from": 6312,
                        "to": 8199,
                        "yFrom": 53,
                        "yTo": 53,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 3701,
                "altRoute": null,
                "fromConnection": {
                    "type": "junction",
                    "at": 6661,
                    "track": 2252,
                    "sc_name": "2119A",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 6731,
                    "track": 3800,
                    "sc_name": "2119B",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 6661,
                        "to": 6731,
                        "yFrom": 53,
                        "yTo": 53,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 3701,
                "altRoute": null,
                "fromConnection": {
                    "type": "junction",
                    "at": 6734,
                    "track": 3800,
                    "sc_name": "2121A",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 6812,
                    "track": 2252,
                    "sc_name": "2121B",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 6734,
                        "to": 6812,
                        "yFrom": 53,
                        "yTo": 53,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 3901,
                "altRoute": null,
                "fromConnection": {
                    "type": "junction",
                    "at": 6620,
                    "track": 3800,
                    "sc_name": "2117",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "buffer",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 6620,
                        "to": 7027,
                        "yFrom": null,
                        "yTo": 47,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 3718,
                "altRoute": null,
                "fromConnection": {
                    "type": "junction",
                    "at": 6626,
                    "track": 2200,
                    "sc_name": "2118A",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 6728,
                    "track": 3901,
                    "sc_name": "2118B",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 6626,
                        "to": 6728,
                        "yFrom": null,
                        "yTo": null,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 3722,
                "altRoute": null,
                "fromConnection": {
                    "type": "junction",
                    "at": 6765,
                    "track": 3901,
                    "sc_name": "2122A",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 6846,
                    "track": 2200,
                    "sc_name": "2122B",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 6765,
                        "to": 6846,
                        "yFrom": null,
                        "yTo": null,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 3900,
                "altRoute": null,
                "fromConnection": {
                    "type": "junction",
                    "at": 6790,
                    "track": 3800,
                    "sc_name": "2117",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "buffer",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 6790,
                        "to": 7163,
                        "yFrom": null,
                        "yTo": 46,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 3700,
                "altRoute": null,
                "fromConnection": {
                    "type": "junction",
                    "at": 6790,
                    "track": 3900,
                    "sc_name": "2123A",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 6842,
                    "track": 3901,
                    "sc_name": "2123B",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 6790,
                        "to": 6842,
                        "yFrom": null,
                        "yTo": null,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 3700,
                "altRoute": null,
                "fromConnection": {
                    "type": "junction",
                    "at": 6731,
                    "track": 3901,
                    "sc_name": "2120A",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 6778,
                    "track": 3800,
                    "sc_name": "2120B",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 6731,
                        "to": 6778,
                        "yFrom": null,
                        "yTo": null,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 3901,
                "altRoute": null,
                "fromConnection": null,
                "toConnection": {
                    "type": "junction",
                    "at": 8269,
                    "track": 1152,
                    "sc_name": "2148",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 8199,
                        "to": 8269,
                        "yFrom": 53,
                        "yTo": 53,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 3902,
                "altRoute": null,
                "fromConnection": null,
                "toConnection": {
                    "type": "junction",
                    "at": 8269,
                    "track": 1152,
                    "sc_name": "2148",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 8199,
                        "to": 8225,
                        "yFrom": 54,
                        "yTo": 54,
                        "electrification": "overhead"
                    },
                    {
                        "from": 8225,
                        "to": 8269,
                        "yFrom": 54,
                        "yTo": null,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 3902,
                "altRoute": {
                    "elr": "HDS",
                    "showAltRuler": false
                },
                "fromConnection": {
                    "type": "buffer",
                    "connectionLink": null
                },
                "toConnection": null,
                "shape": [
                    {
                        "from": 6020,
                        "to": 8199,
                        "yFrom": 54,
                        "yTo": 54,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 1152,
                "altRoute": null,
                "fromConnection": {
                    "type": "junction",
                    "at": 8269,
                    "track": 3901,
                    "sc_name": "2148",
                    "connectionLink": null
                },
                "toConnection": null,
                "shape": [
                    {
                        "from": 8269,
                        "to": 8794,
                        "yFrom": 53,
                        "yTo": 53,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 3900,
                "altRoute": null,
                "fromConnection": {
                    "type": "buffer",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 34810,
                    "track": 3800,
                    "sc_name": "5506B",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 34412,
                        "to": 34810,
                        "yFrom": 52,
                        "yTo": 52,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 3800,
                "altRoute": null,
                "fromConnection": {
                    "type": "junction",
                    "at": 34710,
                    "track": 1200,
                    "sc_name": "5506A",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 35535,
                    "track": 2500,
                    "sc_name": "5511B",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 34710,
                        "to": 34810,
                        "yFrom": null,
                        "yTo": 52,
                        "electrification": "overhead"
                    },
                    {
                        "from": 34810,
                        "to": 34929,
                        "yFrom": 52,
                        "yTo": 52,
                        "electrification": "overhead"
                    },
                    {
                        "from": 34929,
                        "to": 34973,
                        "yFrom": 52,
                        "yTo": 53,
                        "electrification": "overhead"
                    },
                    {
                        "from": 34973,
                        "to": 35130,
                        "yFrom": 53,
                        "yTo": 53,
                        "electrification": "overhead"
                    },
                    {
                        "from": 35130,
                        "to": 35283,
                        "yFrom": 53,
                        "yTo": 47,
                        "electrification": "overhead"
                    },
                    {
                        "from": 35283,
                        "to": 35535,
                        "yFrom": 47,
                        "yTo": 47,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 3200,
                "altRoute": null,
                "fromConnection": {
                    "type": "junction",
                    "at": 34929,
                    "track": 3800,
                    "sc_name": "5507A",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 35559,
                    "track": 1500,
                    "sc_name": "5517B",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 34929,
                        "to": 35559,
                        "yFrom": 52,
                        "yTo": 52,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 1500,
                "altRoute": null,
                "fromConnection": {
                    "type": "junction",
                    "at": 35488,
                    "track": 1200,
                    "sc_name": "5517A",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 36002,
                    "track": 1200,
                    "sc_name": "5525",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 35488,
                        "to": 35559,
                        "yFrom": null,
                        "yTo": 52,
                        "electrification": "overhead"
                    },
                    {
                        "from": 35559,
                        "to": 35958,
                        "yFrom": 52,
                        "yTo": 52,
                        "electrification": "overhead"
                    },
                    {
                        "from": 35958,
                        "to": 36002,
                        "yFrom": 52,
                        "yTo": null,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "altRoute": null,
                "tid": 2500,
                "fromConnection": {
                    "type": "junction",
                    "at": 35459,
                    "track": 2200,
                    "sc_name": "5517A",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 35998,
                    "track": 2200,
                    "sc_name": "5525",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 35459,
                        "to": 35535,
                        "yFrom": null,
                        "yTo": 47,
                        "electrification": "overhead"
                    },
                    {
                        "from": 35535,
                        "to": 35881,
                        "yFrom": 47,
                        "yTo": 47,
                        "electrification": "overhead"
                    },
                    {
                        "from": 35881,
                        "to": 35998,
                        "yFrom": 47,
                        "yTo": null,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 2200,
                "altRoute": null,
                "fromConnection": {
                    "type": "junction",
                    "at": 41963,
                    "track": 2100,
                    "sc_name": "5568",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 121689,
                    "track": 2100,
                    "sc_name": "1166",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 41963,
                        "to": 42007,
                        "yFrom": null,
                        "yTo": 48,
                        "electrification": "overhead"
                    },
                    {
                        "from": 42007,
                        "to": 121645,
                        "yFrom": 48,
                        "yTo": 48,
                        "electrification": "overhead"
                    },
                    {
                        "from": 121645,
                        "to": 121689,
                        "yFrom": 48,
                        "yTo": null,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 1200,
                "altRoute": null,
                "fromConnection": {
                    "type": "junction",
                    "at": 41963,
                    "track": 1100,
                    "sc_name": "5569",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 104262,
                    "track": 1100,
                    "sc_name": "1146",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 41963,
                        "to": 42007,
                        "yFrom": null,
                        "yTo": 51,
                        "electrification": "overhead"
                    },
                    {
                        "from": 42007,
                        "to": 104218,
                        "yFrom": 51,
                        "yTo": 51,
                        "electrification": "overhead"
                    },
                    {
                        "from": 104218,
                        "to": 104262,
                        "yFrom": 51,
                        "yTo": null,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 1200,
                "altRoute": null,
                "fromConnection": {
                    "type": "junction",
                    "at": 115346,
                    "track": 1100,
                    "sc_name": "1158",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 118369,
                    "track": 1100,
                    "sc_name": "1161",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 115346,
                        "to": 115388,
                        "yFrom": null,
                        "yTo": 51,
                        "electrification": "overhead"
                    },
                    {
                        "from": 115388,
                        "to": 118325,
                        "yFrom": 51,
                        "yTo": 51,
                        "electrification": "overhead"
                    },
                    {
                        "from": 118325,
                        "to": 118369,
                        "yFrom": 51,
                        "yTo": null,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 3700,
                "altRoute": null,
                "fromConnection": {
                    "type": "junction",
                    "at": 334112,
                    "track": 1100,
                    "sc_name": "831A",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 334239,
                    "track": 2100,
                    "sc_name": "831B",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 334112,
                        "to": 334239,
                        "yFrom": null,
                        "yTo": null,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "altRoute": null,
                "tid": 1200,
                "fromConnection": {
                    "type": "junction",
                    "at": 334252,
                    "track": 2100,
                    "sc_name": "832A",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 337193,
                    "track": 2100,
                    "sc_name": "851",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 334252,
                        "to": 334470,
                        "yFrom": null,
                        "yTo": 48,
                        "electrification": "overhead"
                    },
                    {
                        "from": 334470,
                        "to": 337149,
                        "yFrom": 48,
                        "yTo": 48,
                        "electrification": "overhead"
                    },
                    {
                        "from": 337149,
                        "to": 337193,
                        "yFrom": 48,
                        "yTo": null,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 2200,
                "altRoute": null,
                "fromConnection": {
                    "type": "junction",
                    "at": 334480,
                    "track": 1200,
                    "sc_name": "834A",
                    "connectionLink": null
                },
                "toConnection": null,
                "shape": [
                    {
                        "from": 334480,
                        "to": 334611,
                        "yFrom": null,
                        "yTo": 47,
                        "electrification": "overhead"
                    },
                    {
                        "from": 334611,
                        "to": 337282,
                        "yFrom": 47,
                        "yTo": 47,
                        "electrification": "overhead"
                    },
                    {
                        "from": 337282,
                        "to": 337392,
                        "yFrom": 47,
                        "yTo": 48,
                        "electrification": "overhead"
                    },
                    {
                        "from": 337392,
                        "to": 382731,
                        "yFrom": 48,
                        "yTo": 48,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 3700,
                "altRoute": null,
                "fromConnection": {
                    "type": "junction",
                    "at": 337211,
                    "track": 2100,
                    "sc_name": "835A",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 337288,
                    "track": 1100,
                    "sc_name": "835B",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 337211,
                        "to": 337288,
                        "yFrom": null,
                        "yTo": null,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "altRoute": null,
                "tid": 1200,
                "fromConnection": {
                    "type": "junction",
                    "at": 337548,
                    "track": 1100,
                    "sc_name": "855",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 384063,
                    "track": 1100,
                    "sc_name": "884",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 337548,
                        "to": 337592,
                        "yFrom": null,
                        "yTo": 51,
                        "electrification": "overhead"
                    },
                    {
                        "from": 337592,
                        "to": 384019,
                        "yFrom": 51,
                        "yTo": 51,
                        "electrification": "overhead"
                    },
                    {
                        "from": 384019,
                        "to": 384063,
                        "yFrom": 51,
                        "yTo": null,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 3700,
                "altRoute": null,
                "fromConnection": {
                    "type": "junction",
                    "at": 382354,
                    "track": 2200,
                    "sc_name": "881A",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 382554,
                    "track": 2100,
                    "sc_name": "881B",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 382354,
                        "to": 382554,
                        "yFrom": null,
                        "yTo": null,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 3700,
                "altRoute": null,
                "fromConnection": {
                    "type": "junction",
                    "at": 382568,
                    "track": 2100,
                    "sc_name": "882A",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 382731,
                    "track": 2200,
                    "sc_name": "882B",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 382568,
                        "to": 382731,
                        "yFrom": null,
                        "yTo": null,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 3700,
                "altRoute": null,
                "fromConnection": {
                    "type": "junction",
                    "at": 418701,
                    "track": 2100,
                    "sc_name": "751A",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 418808,
                    "track": 1100,
                    "sc_name": "751B",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 418701,
                        "to": 418808,
                        "yFrom": null,
                        "yTo": null,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "altRoute": null,
                "tid": 3700,
                "fromConnection": {
                    "type": "junction",
                    "at": 397514,
                    "track": 1100,
                    "sc_name": "1121A",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 397621,
                    "track": 2100,
                    "sc_name": "1121B",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 397514,
                        "to": 397621,
                        "yFrom": null,
                        "yTo": null,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 1150,
                "altRoute": null,
                "fromConnection": null,
                "toConnection": null,
                "shape": [
                    {
                        "from": 322039,
                        "to": 331179,
                        "yFrom": 48,
                        "yTo": 48,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "altRoute": null,
                "fromConnection": null,
                "tid": 2150,
                "shape": [
                    {
                        "from": 322039,
                        "to": 331143,
                        "yFrom": 47,
                        "yTo": 47,
                        "electrification": "overhead"
                    },
                    {
                        "from": 331143,
                        "to": 331240,
                        "yFrom": 47,
                        "yTo": 44,
                        "electrification": "overhead"
                    },
                    {
                        "from": 331240,
                        "to": 331399,
                        "yFrom": 44,
                        "yTo": null,
                        "electrification": "overhead"
                    }
                ],
                "toConnection": {
                    "type": "junction",
                    "at": 331399,
                    "track": 3811,
                    "sc_name": "786B",
                    "connectionLink": null
                }
            },
            {
                "tid": 1100,
                "altRoute": {
                    "elr": "NOC",
                    "showAltRuler": false
                },
                "fromConnection": {
                    "type": "junction",
                    "at": 321879,
                    "track": 2100,
                    "sc_name": "2295AB",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 322052,
                    "track": 1100,
                    "sc_name": "2295C",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 321879,
                        "to": 322052,
                        "yFrom": null,
                        "yTo": null,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "fromConnection": null,
                "tid": 1100,
                "altRoute": {
                    "elr": "NOC",
                    "showAltRuler": false
                },
                "toConnection": {
                    "type": "junction",
                    "at": 32879,
                    "track": 2100,
                    "sc_name": "2295AB",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 321640,
                        "to": 321879,
                        "yFrom": 47,
                        "yTo": null,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "fromConnection": null,
                "tid": 2100,
                "altRoute": {
                    "elr": "NOC",
                    "showAltRuler": false
                },
                "toConnection": {
                    "type": "junction",
                    "at": 322052,
                    "track": 2100,
                    "sc_name": "2296",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 321640,
                        "to": 321879,
                        "yFrom": 46,
                        "yTo": 48,
                        "electrification": "overhead"
                    },
                    {
                        "from": 321879,
                        "to": 322052,
                        "yFrom": 48,
                        "yTo": null,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 1150,
                "altRoute": {
                    "elr": "NOC",
                    "showAltRuler": false
                },
                "fromConnection": null,
                "toConnection": null,
                "shape": [
                    {
                        "from": 321640,
                        "to": 322039,
                        "yFrom": 45,
                        "yTo": 48,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 2150,
                "altRoute": {
                    "elr": "NOC",
                    "showAltRuler": false
                },
                "fromConnection": null,
                "toConnection": null,
                "shape": [
                    {
                        "from": 321640,
                        "to": 322039,
                        "yFrom": 44,
                        "yTo": 47,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 3700,
                "altRoute": null,
                "fromConnection": {
                    "type": "junction",
                    "at": 323154,
                    "track": 1100,
                    "sc_name": "2297A",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 323311,
                    "track": 2100,
                    "sc_name": "2297B",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 323154,
                        "to": 323311,
                        "yFrom": null,
                        "yTo": null,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 3700,
                "altRoute": null,
                "fromConnection": {
                    "type": "junction",
                    "at": 323344,
                    "track": 2100,
                    "sc_name": "2298A",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 323532,
                    "track": 1150,
                    "sc_name": "2298B",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 323344,
                        "to": 323532,
                        "yFrom": null,
                        "yTo": null,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 3700,
                "altRoute": null,
                "fromConnection": {
                    "type": "junction",
                    "at": 323555,
                    "track": 1150,
                    "sc_name": "2299A",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 323717,
                    "track": 2150,
                    "sc_name": "2299B",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 323555,
                        "to": 323717,
                        "yFrom": null,
                        "yTo": null,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 3700,
                "altRoute": null,
                "fromConnection": {
                    "type": "junction",
                    "at": 329986,
                    "track": 1150,
                    "sc_name": "761A",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 330049,
                    "track": 2150,
                    "sc_name": "761B",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 329986,
                        "to": 330049,
                        "yFrom": null,
                        "yTo": null,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 3500,
                "altRoute": null,
                "fromConnection": {
                    "type": "junction",
                    "at": 330068,
                    "track": 2150,
                    "sc_name": "762A",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 330803,
                    "track": 2150,
                    "sc_name": "767B",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 330068,
                        "to": 330117,
                        "yFrom": null,
                        "yTo": 46,
                        "electrification": "overhead"
                    },
                    {
                        "from": 330117,
                        "to": 330760,
                        "yFrom": 46,
                        "yTo": 46,
                        "electrification": "overhead"
                    },
                    {
                        "from": 330760,
                        "to": 330803,
                        "yFrom": 46,
                        "yTo": null,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 2901,
                "altRoute": null,
                "fromConnection": {
                    "type": "buffer_stop",
                    "at": 330003,
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 330117,
                    "track": 3500,
                    "sc_name": "762B",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 330003,
                        "to": 330117,
                        "yFrom": 46,
                        "yTo": null,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 3901,
                "altRoute": null,
                "fromConnection": {
                    "type": "junction",
                    "at": 330224,
                    "track": 3500,
                    "sc_name": "763",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 331019,
                    "track": 2150,
                    "sc_name": "776B",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 330224,
                        "to": 330254,
                        "yFrom": null,
                        "yTo": 45,
                        "electrification": "overhead"
                    },
                    {
                        "from": 330254,
                        "to": 330975,
                        "yFrom": 45,
                        "yTo": 45,
                        "electrification": "overhead"
                    },
                    {
                        "from": 330975,
                        "to": 331019,
                        "yFrom": 45,
                        "yTo": null,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 3902,
                "altRoute": null,
                "fromConnection": {
                    "type": "junction",
                    "at": 330255,
                    "track": 3901,
                    "sc_name": "764",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 330953,
                    "track": 3901,
                    "sc_name": "775",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 330255,
                        "to": 330285,
                        "yFrom": null,
                        "yTo": 44,
                        "electrification": "overhead"
                    },
                    {
                        "from": 330285,
                        "to": 330923,
                        "yFrom": 44,
                        "yTo": 44,
                        "electrification": "overhead"
                    },
                    {
                        "from": 330923,
                        "to": 330953,
                        "yFrom": 44,
                        "yTo": null,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 3903,
                "altRoute": null,
                "fromConnection": {
                    "type": "junction",
                    "at": 330288,
                    "track": 3902,
                    "sc_name": "765",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 330924,
                    "track": 3902,
                    "sc_name": "774",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 330288,
                        "to": 330318,
                        "yFrom": null,
                        "yTo": 43,
                        "electrification": "overhead"
                    },
                    {
                        "from": 330318,
                        "to": 330894,
                        "yFrom": 43,
                        "yTo": 43,
                        "electrification": "overhead"
                    },
                    {
                        "from": 330894,
                        "to": 330924,
                        "yFrom": 43,
                        "yTo": null,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 3701,
                "altRoute": null,
                "fromConnection": {
                    "type": "junction",
                    "at": 330827,
                    "track": 2150,
                    "sc_name": "771A",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 330901,
                    "track": 1150,
                    "sc_name": "771B",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 330827,
                        "to": 330901,
                        "yFrom": null,
                        "yTo": null,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 3700,
                "altRoute": null,
                "fromConnection": {
                    "type": "junction",
                    "at": 330786,
                    "track": 1100,
                    "sc_name": "768A",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 330908,
                    "track": 2100,
                    "sc_name": "768B",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 330786,
                        "to": 330908,
                        "yFrom": null,
                        "yTo": null,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 3700,
                "altRoute": null,
                "fromConnection": {
                    "type": "junction",
                    "at": 330918,
                    "track": 1150,
                    "sc_name": "772A",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 331026,
                    "track": 2100,
                    "sc_name": "772B",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 330918,
                        "to": 331026,
                        "yFrom": null,
                        "yTo": null,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 3811,
                "altRoute": null,
                "fromConnection": {
                    "type": "junction",
                    "at": 331040,
                    "track": 2100,
                    "sc_name": "777A",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 331986,
                    "track": 3810,
                    "sc_name": "803",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 331040,
                        "to": 331179,
                        "yFrom": null,
                        "yTo": 48,
                        "electrification": "overhead"
                    },
                    {
                        "from": 331179,
                        "to": 331197,
                        "yFrom": 48,
                        "yTo": 48,
                        "electrification": "overhead"
                    },
                    {
                        "from": 331197,
                        "to": 331299,
                        "yFrom": 48,
                        "yTo": 45,
                        "electrification": "overhead"
                    },
                    {
                        "from": 331299,
                        "to": 331311,
                        "yFrom": 45,
                        "yTo": 45,
                        "electrification": "overhead"
                    },
                    {
                        "from": 331311,
                        "to": 331399,
                        "yFrom": 45,
                        "yTo": 44,
                        "electrification": "overhead"
                    },
                    {
                        "from": 331399,
                        "to": 331956,
                        "yFrom": 44,
                        "yTo": 44,
                        "electrification": "overhead"
                    },
                    {
                        "from": 331956,
                        "to": 331986,
                        "yFrom": 44,
                        "yTo": 45,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 3810,
                "altRoute": null,
                "fromConnection": {
                    "type": "junction",
                    "at": 331311,
                    "track": 3811,
                    "sc_name": "786A",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 332060,
                    "track": 3800,
                    "sc_name": "804",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 331311,
                        "to": 331986,
                        "yFrom": 45,
                        "yTo": 45,
                        "electrification": "overhead"
                    },
                    {
                        "from": 331986,
                        "to": 332060,
                        "yFrom": 45,
                        "yTo": 46,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 3789,
                "altRoute": null,
                "fromConnection": {
                    "type": "junction",
                    "at": 331143,
                    "track": 2150,
                    "sc_name": "789A",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 331299,
                    "track": 3811,
                    "sc_name": "789B",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 331143,
                        "to": 331299,
                        "yFrom": null,
                        "yTo": null,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 3700,
                "altRoute": null,
                "fromConnection": {
                    "type": "junction",
                    "at": 331131,
                    "track": 2100,
                    "sc_name": "781A",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 331197,
                    "track": 1100,
                    "sc_name": "781B",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 331131,
                        "to": 331197,
                        "yFrom": null,
                        "yTo": null,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "altRoute": null,
                "tid": 3701,
                "fromConnection": {
                    "type": "junction",
                    "at": 331227,
                    "track": 1100,
                    "sc_name": "783A",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 331359,
                    "track": 2100,
                    "sc_name": "783B",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 331227,
                        "to": 331359,
                        "yFrom": null,
                        "yTo": null,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "altRoute": null,
                "tid": 3601,
                "fromConnection": {
                    "type": "junction",
                    "at": 331398,
                    "track": 1100,
                    "sc_name": "788",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "buffer_stop",
                    "at": 331751,
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 331398,
                        "to": 331438,
                        "yFrom": null,
                        "yTo": 53,
                        "electrification": "overhead"
                    },
                    {
                        "from": 331438,
                        "to": 331751,
                        "yFrom": 53,
                        "yTo": 53,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "altRoute": null,
                "tid": 3809,
                "fromConnection": {
                    "type": "junction",
                    "at": 331197,
                    "track": 3811,
                    "sc_name": "784",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 332060,
                    "track": 3800,
                    "sc_name": "804",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 331197,
                        "to": 331248,
                        "yFrom": null,
                        "yTo": 48,
                        "electrification": "overhead"
                    },
                    {
                        "from": 331248,
                        "to": 331321,
                        "yFrom": 48,
                        "yTo": 46,
                        "electrification": "overhead"
                    },
                    {
                        "from": 331321,
                        "to": 332060,
                        "yFrom": 46,
                        "yTo": 46,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "altRoute": null,
                "tid": 3606,
                "fromConnection": {
                    "type": "junction",
                    "at": 331248,
                    "track": 3809,
                    "sc_name": "784",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "buffer_stop",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 331248,
                        "to": 331749,
                        "yFrom": 48,
                        "yTo": 48,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 3607,
                "altRoute": null,
                "fromConnection": {
                    "type": "junction",
                    "at": 331331,
                    "track": 3606,
                    "sc_name": "785",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "buffer_stop",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 331331,
                        "to": 331371,
                        "yFrom": null,
                        "yTo": 47,
                        "electrification": "overhead"
                    },
                    {
                        "from": 331371,
                        "to": 331749,
                        "yFrom": 47,
                        "yTo": 47,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "altRoute": null,
                "tid": 3608,
                "fromConnection": {
                    "type": "buffer",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 332116,
                    "track": 2100,
                    "sc_name": "807",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 331796,
                        "to": 332076,
                        "yFrom": 47,
                        "yTo": 47,
                        "electrification": "overhead"
                    },
                    {
                        "from": 332076,
                        "to": 332116,
                        "yFrom": 47,
                        "yTo": null,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 3700,
                "altRoute": null,
                "fromConnection": {
                    "type": "junction",
                    "at": 332093,
                    "track": 1100,
                    "sc_name": "808A",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 332182,
                    "track": 2100,
                    "sc_name": "808B",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 332093,
                        "to": 332182,
                        "yFrom": null,
                        "yTo": null,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "altRoute": null,
                "tid": 3800,
                "fromConnection": {
                    "type": "junction",
                    "at": 332060,
                    "track": 3809,
                    "sc_name": "804",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 332060,
                        "to": 332181,
                        "yFrom": 46,
                        "yTo": 46,
                        "electrification": "overhead"
                    },
                    {
                        "from": 332181,
                        "to": 332300,
                        "yFrom": 46,
                        "yTo": 48,
                        "electrification": "overhead"
                    },
                    {
                        "from": 332300,
                        "to": 332363,
                        "yFrom": 48,
                        "yTo": 48,
                        "electrification": "overhead"
                    },
                    {
                        "from": 332363,
                        "to": 332449,
                        "yFrom": 48,
                        "yTo": 49,
                        "electrification": "overhead"
                    }
                ],
                "toConnection": {
                    "type": "junction",
                    "at": 332449,
                    "track": 2100,
                    "sc_name": "812B",
                    "connectionLink": null
                }
            },
            {
                "tid": 3701,
                "altRoute": null,
                "fromConnection": {
                    "type": "junction",
                    "at": 332101,
                    "track": 3800,
                    "sc_name": "806A",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 332261,
                    "track": 2100,
                    "sc_name": "806B",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 332101,
                        "to": 332261,
                        "yFrom": null,
                        "yTo": null,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 3700,
                "altRoute": null,
                "fromConnection": {
                    "type": "junction",
                    "at": 332281,
                    "track": 2100,
                    "sc_name": "811A",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 332365,
                    "track": 1100,
                    "sc_name": "811B",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 332281,
                        "to": 332365,
                        "yFrom": null,
                        "yTo": null,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "altRoute": null,
                "tid": 3900,
                "fromConnection": {
                    "type": "junction",
                    "at": 332363,
                    "track": 3800,
                    "sc_name": "812A",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "buffer_stop",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 332363,
                        "to": 332403,
                        "yFrom": 48,
                        "yTo": 48,
                        "electrification": "none"
                    },
                    {
                        "from": 332403,
                        "to": 332443,
                        "yFrom": 48,
                        "yTo": 47,
                        "electrification": "none"
                    },
                    {
                        "from": 332443,
                        "to": 332935,
                        "yFrom": 47,
                        "yTo": 47,
                        "electrification": "none"
                    }
                ]
            },
            {
                "altRoute": null,
                "tid": 3902,
                "fromConnection": {
                    "type": "junction",
                    "at": 331316,
                    "track": 2150,
                    "sc_name": "787A",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "buffer_stop",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 331316,
                        "to": 331380,
                        "yFrom": null,
                        "yTo": 43,
                        "electrification": "none"
                    },
                    {
                        "from": 331380,
                        "to": 331499,
                        "yFrom": 43,
                        "yTo": 43,
                        "electrification": "none"
                    }
                ]
            },
            {
                "tid": 3901,
                "altRoute": null,
                "fromConnection": {
                    "type": "junction",
                    "at": 331393,
                    "track": 3902,
                    "sc_name": "790",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "buffer_stop",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 331393,
                        "to": 331423,
                        "yFrom": null,
                        "yTo": 42,
                        "electrification": "none"
                    },
                    {
                        "from": 331423,
                        "to": 331498,
                        "yFrom": 42,
                        "yTo": 42,
                        "electrification": "none"
                    }
                ]
            },
            {
                "altRoute": null,
                "tid": 3701,
                "fromConnection": {
                    "type": "junction",
                    "at": 337177,
                    "track": 2200,
                    "sc_name": "852A",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 337304,
                    "track": 2100,
                    "sc_name": "852B",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 337177,
                        "to": 337304,
                        "yFrom": null,
                        "yTo": null,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "altRoute": null,
                "tid": 3700,
                "fromConnection": {
                    "type": "junction",
                    "at": 337429,
                    "track": 2100,
                    "sc_name": "854A",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 337572,
                    "track": 2200,
                    "sc_name": "854B",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 337429,
                        "to": 337572,
                        "yFrom": null,
                        "yTo": null,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "altRoute": null,
                "tid": 3700,
                "fromConnection": {
                    "type": "junction",
                    "at": 334737,
                    "track": 2200,
                    "sc_name": "843A",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 334806,
                    "track": 1200,
                    "sc_name": "843B",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 334737,
                        "to": 334806,
                        "yFrom": null,
                        "yTo": null,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 3100,
                "altRoute": {
                    "elr": "HAY1",
                    "showAltRuler": false
                },
                "fromConnection": {
                    "type": "junction",
                    "at": 334652,
                    "track": 2200,
                    "sc_name": "842",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 334652,
                        "to": 334696,
                        "yFrom": null,
                        "yTo": 46,
                        "electrification": "none"
                    },
                    {
                        "from": 334696,
                        "to": 334832,
                        "yFrom": 46,
                        "yTo": 46,
                        "electrification": "none"
                    }
                ],
                "toConnection": {
                    "type": "junction",
                    "at": 334832,
                    "track": 1100,
                    "sc_name": "845",
                    "elr": "HAY1",
                    "connectionLink": null
                }
            },
            {
                "altRoute": null,
                "tid": 3700,
                "fromConnection": {
                    "type": "junction",
                    "at": 348532,
                    "track": 1100,
                    "sc_name": "862A",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 348597,
                    "track": 2100,
                    "sc_name": "862B",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 348532,
                        "to": 348597,
                        "yFrom": null,
                        "yTo": null,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "altRoute": null,
                "tid": 3701,
                "fromConnection": {
                    "type": "junction",
                    "at": 348621,
                    "track": 2100,
                    "sc_name": "863A",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 348820,
                    "track": 2200,
                    "sc_name": "863B",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 348621,
                        "to": 348820,
                        "yFrom": null,
                        "yTo": null,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 3700,
                "altRoute": null,
                "fromConnection": {
                    "type": "junction",
                    "at": 348640,
                    "track": 1100,
                    "sc_name": "864A",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 348839,
                    "track": 1200,
                    "sc_name": "864B",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 348640,
                        "to": 348839,
                        "yFrom": null,
                        "yTo": null,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 3901,
                "altRoute": null,
                "fromConnection": {
                    "type": "buffer",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 348557,
                    "track": 3900,
                    "sc_name": "861B",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 348438,
                        "to": 348557,
                        "yFrom": 52,
                        "yTo": 52,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "altRoute": null,
                "tid": 3900,
                "fromConnection": {
                    "type": "junction",
                    "at": 348490,
                    "track": 1200,
                    "sc_name": "861A",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "buffer_stop",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 348490,
                        "to": 348557,
                        "yFrom": null,
                        "yTo": 52,
                        "electrification": "overhead"
                    },
                    {
                        "from": 348557,
                        "to": 348747,
                        "yFrom": 52,
                        "yTo": 52,
                        "electrification": "overhead"
                    },
                    {
                        "from": 348747,
                        "to": 348790,
                        "yFrom": 52,
                        "yTo": 53,
                        "electrification": "none"
                    },
                    {
                        "from": 348790,
                        "to": 348817,
                        "yFrom": 53,
                        "yTo": 53,
                        "electrification": "none"
                    }
                ]
            },
            {
                "tid": 3903,
                "altRoute": null,
                "fromConnection": null,
                "toConnection": {
                    "type": "buffer_stop",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 348747,
                        "to": 348834,
                        "yFrom": 52,
                        "yTo": 52,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 3902,
                "altRoute": null,
                "fromConnection": null,
                "toConnection": {
                    "type": "buffer_stop",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 348656,
                        "to": 348680,
                        "yFrom": 52,
                        "yTo": 53,
                        "electrification": "none"
                    },
                    {
                        "from": 348680,
                        "to": 348745,
                        "yFrom": 53,
                        "yTo": 53,
                        "electrification": "none"
                    }
                ]
            },
            {
                "tid": 3700,
                "altRoute": null,
                "fromConnection": {
                    "type": "junction",
                    "at": 349612,
                    "track": 1200,
                    "sc_name": "865A",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 349771,
                    "track": 1100,
                    "sc_name": "865B",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 349612,
                        "to": 349771,
                        "yFrom": null,
                        "yTo": null,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 3701,
                "altRoute": null,
                "fromConnection": {
                    "type": "junction",
                    "at": 349721,
                    "track": 2200,
                    "sc_name": "866A",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 349839,
                    "track": 2100,
                    "sc_name": "866B",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 349721,
                        "to": 349839,
                        "yFrom": null,
                        "yTo": null,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "altRoute": null,
                "tid": 3700,
                "fromConnection": {
                    "type": "junction",
                    "at": 307920,
                    "track": 1100,
                    "sc_name": "2942A",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 308029,
                    "track": 2100,
                    "sc_name": "2942B",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 307920,
                        "to": 308029,
                        "yFrom": null,
                        "yTo": null,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "altRoute": null,
                "tid": 3901,
                "fromConnection": {
                    "type": "buffer_stop",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "buffer_stop",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 294247,
                        "to": 294737,
                        "yFrom": 51,
                        "yTo": 51,
                        "electrification": "none"
                    }
                ]
            },
            {
                "altRoute": null,
                "tid": 3903,
                "fromConnection": {
                    "type": "junction",
                    "at": 294409,
                    "track": 3901,
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "buffer_stop",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 294409,
                        "to": 294437,
                        "yFrom": null,
                        "yTo": 52,
                        "electrification": "none"
                    },
                    {
                        "from": 294437,
                        "to": 294462,
                        "yFrom": 52,
                        "yTo": 53,
                        "electrification": "none"
                    },
                    {
                        "from": 294462,
                        "to": 294754,
                        "yFrom": 53,
                        "yTo": 53,
                        "electrification": "none"
                    }
                ]
            },
            {
                "altRoute": null,
                "tid": 3902,
                "fromConnection": {
                    "type": "junction",
                    "at": 294437,
                    "track": 3903,
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "buffer_stop",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 294437,
                        "to": 294755,
                        "yFrom": null,
                        "yTo": 52,
                        "electrification": "none"
                    }
                ]
            },
            {
                "tid": 3904,
                "altRoute": null,
                "fromConnection": {
                    "type": "junction",
                    "at": 294462,
                    "track": 3903,
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "buffer_stop",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 294462,
                        "to": 294500,
                        "yFrom": null,
                        "yTo": 54,
                        "electrification": "none"
                    },
                    {
                        "from": 294500,
                        "to": 294688,
                        "yFrom": 54,
                        "yTo": 54,
                        "electrification": "none"
                    }
                ]
            },
            {
                "altRoute": null,
                "tid": 3900,
                "fromConnection": {
                    "type": "junction",
                    "at": 294316,
                    "track": 1100,
                    "sc_name": "2A",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 294428,
                    "track": 3901,
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 294316,
                        "to": 294428,
                        "yFrom": null,
                        "yTo": null,
                        "electrification": "none"
                    }
                ]
            },
            {
                "altRoute": null,
                "tid": 3700,
                "fromConnection": {
                    "type": "junction",
                    "at": 294410,
                    "track": 3900,
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 294427,
                    "track": 3903,
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 294410,
                        "to": 294427,
                        "yFrom": null,
                        "yTo": null,
                        "electrification": "none"
                    }
                ]
            },
            {
                "tid": 3700,
                "altRoute": null,
                "fromConnection": {
                    "type": "junction",
                    "at": 297597,
                    "track": 2100,
                    "sc_name": "2951A",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 297757,
                    "track": 1100,
                    "sc_name": "2951B",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 297597,
                        "to": 297757,
                        "yFrom": null,
                        "yTo": null,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "toConnection": null,
                "tid": 3100,
                "altRoute": {
                    "elr": "TCW1",
                    "showAltRuler": false
                },
                "fromConnection": {
                    "type": "junction",
                    "at": 297781,
                    "track": 1100,
                    "sc_name": "2952",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 297781,
                        "to": 297860,
                        "yFrom": null,
                        "yTo": 51,
                        "electrification": "none"
                    },
                    {
                        "from": 297860,
                        "to": 298200,
                        "yFrom": 51,
                        "yTo": 51,
                        "electrification": "none"
                    }
                ]
            },
            {
                "tid": 3700,
                "altRoute": null,
                "fromConnection": {
                    "type": "junction",
                    "at": 306557,
                    "track": 1100,
                    "sc_name": "2939A",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 306715,
                    "track": 2100,
                    "sc_name": "2939B",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 306557,
                        "to": 306715,
                        "yFrom": null,
                        "yTo": null,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "toConnection": null,
                "tid": 2100,
                "altRoute": {
                    "elr": "HSC",
                    "showAltRuler": false
                },
                "fromConnection": {
                    "type": "junction",
                    "at": 306468,
                    "track": 2100,
                    "sc_name": "2938",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 306468,
                        "to": 306548,
                        "yFrom": null,
                        "yTo": 48,
                        "electrification": "none"
                    }
                ]
            },
            {
                "toConnection": null,
                "tid": 1100,
                "altRoute": {
                    "elr": "HSC",
                    "showAltRuler": false
                },
                "fromConnection": {
                    "type": "junction",
                    "at": 306741,
                    "track": 2100,
                    "sc_name": "2940",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 306741,
                        "to": 306820,
                        "yFrom": null,
                        "yTo": 48,
                        "electrification": "none"
                    }
                ]
            },
            {
                "tid": 3100,
                "altRoute": {
                    "elr": "HNC",
                    "showAltRuler": false
                },
                "fromConnection": null,
                "toConnection": {
                    "type": "junction",
                    "at": 307898,
                    "track": 1100,
                    "sc_name": "2942A",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 307810,
                        "to": 307898,
                        "yFrom": 51,
                        "yTo": null,
                        "electrification": "none"
                    }
                ]
            },
            {
                "toConnection": null,
                "tid": 3100,
                "altRoute": {
                    "elr": "YMS",
                    "showAltRuler": false
                },
                "fromConnection": {
                    "type": "junction",
                    "at": 331909,
                    "track": 2100,
                    "sc_name": "802",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 331909,
                        "to": 331966,
                        "yFrom": null,
                        "yTo": 50,
                        "electrification": "none"
                    },
                    {
                        "from": 331966,
                        "to": 332034,
                        "yFrom": 50,
                        "yTo": 51,
                        "electrification": "none"
                    },
                    {
                        "from": 332034,
                        "to": 332222,
                        "yFrom": 51,
                        "yTo": 51,
                        "electrification": "none"
                    }
                ]
            },
            {
                "toConnection": null,
                "tid": 2200,
                "altRoute": {
                    "elr": "HOS",
                    "showAltRuler": false
                },
                "fromConnection": {
                    "type": "junction",
                    "at": 331056,
                    "track": 2150,
                    "sc_name": "779",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 331056,
                        "to": 331122,
                        "yFrom": null,
                        "yTo": 45,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "toConnection": null,
                "tid": 1200,
                "altRoute": {
                    "elr": "HOS",
                    "showAltRuler": false
                },
                "fromConnection": {
                    "type": "junction",
                    "at": 331056,
                    "track": 1150,
                    "sc_name": "778",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 331056,
                        "to": 331144,
                        "yFrom": null,
                        "yTo": 45,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 2200,
                "altRoute": null,
                "fromConnection": null,
                "toConnection": null,
                "shape": [
                    {
                        "from": 274244,
                        "to": 275373,
                        "yFrom": 48,
                        "yTo": 48,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 1200,
                "altRoute": null,
                "fromConnection": {
                    "type": "junction",
                    "at": 267520,
                    "track": 1100,
                    "sc_name": "2282",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 275488,
                    "track": 1100,
                    "sc_name": "2481",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 267520,
                        "to": 267564,
                        "yFrom": null,
                        "yTo": 51,
                        "electrification": "overhead"
                    },
                    {
                        "from": 267564,
                        "to": 275444,
                        "yFrom": 51,
                        "yTo": 51,
                        "electrification": "overhead"
                    },
                    {
                        "from": 275444,
                        "to": 275488,
                        "yFrom": 51,
                        "yTo": null,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 3201,
                "altRoute": null,
                "fromConnection": {
                    "type": "junction",
                    "at": 270911,
                    "track": 2100,
                    "sc_name": "2311A",
                    "connectionLink": null
                },
                "toConnection": null,
                "shape": [
                    {
                        "from": 270911,
                        "to": 270955,
                        "yFrom": null,
                        "yTo": 48,
                        "electrification": "overhead"
                    },
                    {
                        "from": 270955,
                        "to": 273651,
                        "yFrom": 48,
                        "yTo": 48,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 3200,
                "altRoute": null,
                "fromConnection": null,
                "toConnection": null,
                "shape": [
                    {
                        "from": 273651,
                        "to": 274244,
                        "yFrom": 48,
                        "yTo": 48,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "altRoute": null,
                "tid": 3302,
                "fromConnection": {
                    "type": "junction",
                    "at": 273651,
                    "track": 3200,
                    "sc_name": "2400",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 273651,
                        "to": 273695,
                        "yFrom": null,
                        "yTo": 47,
                        "electrification": "overhead"
                    },
                    {
                        "from": 273695,
                        "to": 274128,
                        "yFrom": 47,
                        "yTo": 47,
                        "electrification": "overhead"
                    },
                    {
                        "from": 274128,
                        "to": 274230,
                        "yFrom": 47,
                        "yTo": 42,
                        "electrification": "overhead"
                    },
                    {
                        "from": 274230,
                        "to": 274758,
                        "yFrom": 42,
                        "yTo": 42,
                        "electrification": "overhead"
                    },
                    {
                        "from": 274758,
                        "to": 274829,
                        "yFrom": 42,
                        "yTo": null,
                        "electrification": "overhead"
                    }
                ],
                "toConnection": {
                    "type": "junction",
                    "at": 274829,
                    "track": 3301,
                    "sc_name": "2442B",
                    "connectionLink": null
                }
            },
            {
                "altRoute": null,
                "tid": 2808,
                "fromConnection": {
                    "type": "junction",
                    "at": 274251,
                    "track": 2200,
                    "sc_name": "2423",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 274251,
                        "to": 274285,
                        "yFrom": null,
                        "yTo": 47,
                        "electrification": "overhead"
                    },
                    {
                        "from": 274285,
                        "to": 274398,
                        "yFrom": 47,
                        "yTo": 44,
                        "electrification": "overhead"
                    },
                    {
                        "from": 274398,
                        "to": 274714,
                        "yFrom": 44,
                        "yTo": 44,
                        "electrification": "overhead"
                    },
                    {
                        "from": 274714,
                        "to": 274817,
                        "yFrom": 44,
                        "yTo": null,
                        "electrification": "overhead"
                    }
                ],
                "toConnection": {
                    "type": "junction",
                    "at": 274817,
                    "track": 2200,
                    "sc_name": "2445",
                    "connectionLink": null
                }
            },
            {
                "tid": 3605,
                "altRoute": null,
                "fromConnection": {
                    "type": "junction",
                    "at": 274285,
                    "track": 2808,
                    "sc_name": "2424",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "buffer_stop",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 274285,
                        "to": 274410,
                        "yFrom": null,
                        "yTo": 47,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "altRoute": null,
                "tid": 3607,
                "fromConnection": {
                    "type": "buffer_stop",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 274785,
                    "track": 2200,
                    "sc_name": "2448",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 274551,
                        "to": 274696,
                        "yFrom": 45,
                        "yTo": 45,
                        "electrification": "overhead"
                    },
                    {
                        "from": 274696,
                        "to": 274718,
                        "yFrom": 45,
                        "yTo": 46,
                        "electrification": "overhead"
                    },
                    {
                        "from": 274718,
                        "to": 274750,
                        "yFrom": 46,
                        "yTo": 47,
                        "electrification": "overhead"
                    },
                    {
                        "from": 274750,
                        "to": 274785,
                        "yFrom": 47,
                        "yTo": null,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 3900,
                "altRoute": null,
                "fromConnection": {
                    "type": "buffer_stop",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 274718,
                    "track": 3607,
                    "sc_name": "2446B",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 274551,
                        "to": 274718,
                        "yFrom": 46,
                        "yTo": null,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 3606,
                "altRoute": null,
                "fromConnection": {
                    "type": "buffer_stop",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 274750,
                    "track": 3607,
                    "sc_name": "2447",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 274551,
                        "to": 274750,
                        "yFrom": 47,
                        "yTo": null,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "altRoute": null,
                "tid": 3301,
                "fromConnection": {
                    "type": "junction",
                    "at": 274157,
                    "track": 3200,
                    "sc_name": "2461A",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 274157,
                        "to": 274216,
                        "yFrom": null,
                        "yTo": 47,
                        "electrification": "overhead"
                    },
                    {
                        "from": 274216,
                        "to": 274220,
                        "yFrom": 47,
                        "yTo": 47,
                        "electrification": "overhead"
                    },
                    {
                        "from": 274220,
                        "to": 274296,
                        "yFrom": 47,
                        "yTo": 43,
                        "electrification": "overhead"
                    },
                    {
                        "from": 274296,
                        "to": 274736,
                        "yFrom": 43,
                        "yTo": 43,
                        "electrification": "overhead"
                    },
                    {
                        "from": 274736,
                        "to": 274862,
                        "yFrom": 43,
                        "yTo": null,
                        "electrification": "overhead"
                    }
                ],
                "toConnection": {
                    "type": "junction",
                    "at": 274862,
                    "track": 2200,
                    "sc_name": "2445",
                    "connectionLink": null
                }
            },
            {
                "tid": 3702,
                "altRoute": null,
                "fromConnection": {
                    "type": "junction",
                    "at": 274220,
                    "track": 3301,
                    "sc_name": "2452A",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 274398,
                    "track": 2808,
                    "sc_name": "2426",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 274220,
                        "to": 274242,
                        "yFrom": null,
                        "yTo": 47,
                        "electrification": "overhead"
                    },
                    {
                        "from": 274242,
                        "to": 274376,
                        "yFrom": 47,
                        "yTo": 44,
                        "electrification": "overhead"
                    },
                    {
                        "from": 274376,
                        "to": 274398,
                        "yFrom": 44,
                        "yTo": null,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 3700,
                "altRoute": null,
                "fromConnection": {
                    "type": "junction",
                    "at": 274128,
                    "track": 3302,
                    "sc_name": "2413A",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 274216,
                    "track": 3301,
                    "sc_name": "2416B",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 274128,
                        "to": 274216,
                        "yFrom": null,
                        "yTo": null,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "altRoute": null,
                "toConnection": null,
                "tid": 2300,
                "fromConnection": {
                    "type": "junction",
                    "at": 274770,
                    "track": 3302,
                    "sc_name": "2442A",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 274770,
                        "to": 274890,
                        "yFrom": null,
                        "yTo": 47,
                        "electrification": "overhead"
                    },
                    {
                        "from": 274890,
                        "to": 274898,
                        "yFrom": 47,
                        "yTo": 47,
                        "electrification": "overhead"
                    },
                    {
                        "from": 274898,
                        "to": 274978,
                        "yFrom": 47,
                        "yTo": 47,
                        "electrification": "none"
                    },
                    {
                        "from": 274978,
                        "to": 275496,
                        "yFrom": 47,
                        "yTo": 47,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 2200,
                "altRoute": null,
                "fromConnection": {
                    "type": "junction",
                    "at": 131763,
                    "track": 2100,
                    "sc_name": "1198",
                    "connectionLink": null
                },
                "toConnection": null,
                "shape": [
                    {
                        "from": 131763,
                        "to": 131807,
                        "yFrom": null,
                        "yTo": 48,
                        "electrification": "overhead"
                    },
                    {
                        "from": 131807,
                        "to": 134187,
                        "yFrom": 48,
                        "yTo": 48,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "altRoute": null,
                "tid": 1200,
                "fromConnection": {
                    "type": "junction",
                    "at": 132244,
                    "track": 1100,
                    "sc_name": "1203",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 132244,
                        "to": 132288,
                        "yFrom": null,
                        "yTo": 51,
                        "electrification": "overhead"
                    },
                    {
                        "from": 132288,
                        "to": 133959,
                        "yFrom": 51,
                        "yTo": 51,
                        "electrification": "overhead"
                    },
                    {
                        "from": 133959,
                        "to": 134003,
                        "yFrom": 51,
                        "yTo": 52,
                        "electrification": "overhead"
                    },
                    {
                        "from": 134003,
                        "to": 134750,
                        "yFrom": 52,
                        "yTo": 52,
                        "electrification": "overhead"
                    },
                    {
                        "from": 134750,
                        "to": 134794,
                        "yFrom": 52,
                        "yTo": 51,
                        "electrification": "overhead"
                    },
                    {
                        "from": 134794,
                        "to": 175529,
                        "yFrom": 51,
                        "yTo": 51,
                        "electrification": "overhead"
                    },
                    {
                        "from": 175529,
                        "to": 175573,
                        "yFrom": 51,
                        "yTo": null,
                        "electrification": "overhead"
                    }
                ],
                "toConnection": {
                    "type": "junction",
                    "at": 175573,
                    "track": 1100,
                    "sc_name": "1316",
                    "connectionLink": null
                }
            },
            {
                "tid": 3701,
                "altRoute": null,
                "fromConnection": {
                    "type": "junction",
                    "at": 131866,
                    "track": 1100,
                    "sc_name": "1197A",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 131973,
                    "track": 2100,
                    "sc_name": "1197B",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 131866,
                        "to": 131973,
                        "yFrom": null,
                        "yTo": null,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 3700,
                "altRoute": null,
                "fromConnection": {
                    "type": "junction",
                    "at": 132058,
                    "track": 2100,
                    "sc_name": "1202A",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 132166,
                    "track": 1100,
                    "sc_name": "1202B",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 132058,
                        "to": 132166,
                        "yFrom": null,
                        "yTo": null,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 3700,
                "altRoute": null,
                "fromConnection": {
                    "type": "junction",
                    "at": 133864,
                    "track": 2100,
                    "sc_name": "1217A",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 133962,
                    "track": 1100,
                    "sc_name": "1217B",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 133864,
                        "to": 133962,
                        "yFrom": null,
                        "yTo": null,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 3701,
                "altRoute": null,
                "fromConnection": {
                    "type": "junction",
                    "at": 133938,
                    "track": 2100,
                    "sc_name": "1214A",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 134028,
                    "track": 2200,
                    "sc_name": "1214B",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 133938,
                        "to": 134028,
                        "yFrom": null,
                        "yTo": null,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "altRoute": null,
                "tid": 1252,
                "fromConnection": {
                    "type": "junction",
                    "at": 133979,
                    "track": 1100,
                    "sc_name": "1218",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 134749,
                    "track": 1100,
                    "sc_name": "1243",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 133979,
                        "to": 134026,
                        "yFrom": null,
                        "yTo": 51,
                        "electrification": "overhead"
                    },
                    {
                        "from": 134026,
                        "to": 134711,
                        "yFrom": 51,
                        "yTo": 51,
                        "electrification": "overhead"
                    },
                    {
                        "from": 134711,
                        "to": 134749,
                        "yFrom": 51,
                        "yTo": null,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 3700,
                "altRoute": null,
                "fromConnection": {
                    "type": "junction",
                    "at": 134026,
                    "track": 1252,
                    "sc_name": "1219A",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 134095,
                    "track": 1200,
                    "sc_name": "1219B",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 134026,
                        "to": 134095,
                        "yFrom": null,
                        "yTo": null,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 3742,
                "altRoute": null,
                "fromConnection": {
                    "type": "junction",
                    "at": 134605,
                    "track": 1200,
                    "sc_name": "1242A",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 134711,
                    "track": 1252,
                    "sc_name": "1242B",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 134605,
                        "to": 134711,
                        "yFrom": null,
                        "yTo": null,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "altRoute": null,
                "fromConnection": null,
                "toConnection": null,
                "tid": 2202,
                "shape": [
                    {
                        "from": 134187,
                        "to": 134786,
                        "yFrom": 48,
                        "yTo": 48,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "altRoute": null,
                "toConnection": null,
                "tid": 2201,
                "fromConnection": {
                    "type": "junction",
                    "at": 134187,
                    "track": 2202,
                    "sc_name": "1216A",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 134187,
                        "to": 134297,
                        "yFrom": null,
                        "yTo": 47,
                        "electrification": "overhead"
                    },
                    {
                        "from": 134297,
                        "to": 134672,
                        "yFrom": 47,
                        "yTo": 47,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "altRoute": null,
                "tid": 3700,
                "fromConnection": {
                    "type": "junction",
                    "at": 134712,
                    "track": 2202,
                    "sc_name": "1234A",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 134824,
                    "track": 2100,
                    "sc_name": "1234B",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 134712,
                        "to": 134824,
                        "yFrom": null,
                        "yTo": null,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "altRoute": null,
                "tid": 3701,
                "fromConnection": {
                    "type": "junction",
                    "at": 134672,
                    "track": 2201,
                    "sc_name": "1232A",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 134786,
                    "track": 3700,
                    "sc_name": "1233B",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 134672,
                        "to": 134786,
                        "yFrom": null,
                        "yTo": null,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 3702,
                "altRoute": null,
                "fromConnection": {
                    "type": "junction",
                    "at": 134713,
                    "track": 3701,
                    "sc_name": "1233A",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 134786,
                    "track": 2202,
                    "sc_name": "1232B",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 134713,
                        "to": 134786,
                        "yFrom": null,
                        "yTo": null,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 3700,
                "altRoute": null,
                "fromConnection": {
                    "type": "junction",
                    "at": 134835,
                    "track": 2100,
                    "sc_name": "1240A",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 134901,
                    "track": 1100,
                    "sc_name": "1240B",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 134835,
                        "to": 134901,
                        "yFrom": null,
                        "yTo": null,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 3701,
                "altRoute": null,
                "fromConnection": {
                    "type": "junction",
                    "at": 134917,
                    "track": 1100,
                    "sc_name": "1244A",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 135001,
                    "track": 1200,
                    "sc_name": "1244B",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 134917,
                        "to": 135001,
                        "yFrom": null,
                        "yTo": null,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 3700,
                "altRoute": null,
                "fromConnection": {
                    "type": "junction",
                    "at": 134970,
                    "track": 1100,
                    "sc_name": "1241A",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 135047,
                    "track": 2100,
                    "sc_name": "1241B",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 134970,
                        "to": 135047,
                        "yFrom": null,
                        "yTo": null,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "fromConnection": null,
                "toConnection": null,
                "tid": 2150,
                "altRoute": {
                    "elr": "PMJ",
                    "showAltRuler": true
                },
                "shape": [
                    {
                        "from": 134672,
                        "to": 138160,
                        "yFrom": 47,
                        "yTo": 47,
                        "electrification": "overhead"
                    },
                    {
                        "from": 138160,
                        "to": 138380,
                        "yFrom": 47,
                        "yTo": 46,
                        "electrification": "overhead"
                    },
                    {
                        "from": 138380,
                        "to": 138682,
                        "yFrom": 46,
                        "yTo": 46,
                        "electrification": "overhead"
                    },
                    {
                        "from": 138682,
                        "to": 138726,
                        "yFrom": 46,
                        "yTo": 45,
                        "electrification": "overhead"
                    },
                    {
                        "from": 138726,
                        "to": 140360,
                        "yFrom": 45,
                        "yTo": 45,
                        "electrification": "overhead"
                    },
                    {
                        "from": 140360,
                        "to": 140580,
                        "yFrom": 45,
                        "yTo": 46,
                        "electrification": "overhead"
                    },
                    {
                        "from": 140580,
                        "to": 143800,
                        "yFrom": 46,
                        "yTo": 46,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "fromConnection": null,
                "toConnection": null,
                "tid": 1150,
                "altRoute": {
                    "elr": "PMJ",
                    "showAltRuler": true
                },
                "shape": [
                    {
                        "from": 134786,
                        "to": 135467,
                        "yFrom": 48,
                        "yTo": 48,
                        "electrification": "overhead"
                    },
                    {
                        "from": 135467,
                        "to": 138160,
                        "yFrom": 48,
                        "yTo": 48,
                        "electrification": "none"
                    },
                    {
                        "from": 138160,
                        "to": 138380,
                        "yFrom": 48,
                        "yTo": 47,
                        "electrification": "none"
                    },
                    {
                        "from": 138380,
                        "to": 138682,
                        "yFrom": 47,
                        "yTo": 47,
                        "electrification": "none"
                    },
                    {
                        "from": 138682,
                        "to": 138726,
                        "yFrom": 47,
                        "yTo": 48,
                        "electrification": "none"
                    },
                    {
                        "from": 138726,
                        "to": 140360,
                        "yFrom": 48,
                        "yTo": 48,
                        "electrification": "none"
                    },
                    {
                        "from": 140360,
                        "to": 140580,
                        "yFrom": 48,
                        "yTo": 47,
                        "electrification": "none"
                    },
                    {
                        "from": 140580,
                        "to": 143876,
                        "yFrom": 47,
                        "yTo": 47,
                        "electrification": "none"
                    },
                    {
                        "from": 143876,
                        "to": 143901,
                        "yFrom": 47,
                        "yTo": 47,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 3700,
                "altRoute": {
                    "elr": "PMJ",
                    "showAltRuler": false
                },
                "fromConnection": {
                    "type": "junction",
                    "at": 134883,
                    "track": 1150,
                    "sc_name": "1235A",
                    "elr": "PMJ",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 134995,
                    "track": 2150,
                    "sc_name": "1235B",
                    "elr": "PMJ",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 134883,
                        "to": 134995,
                        "yFrom": null,
                        "yTo": null,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 3700,
                "altRoute": {
                    "elr": "PMJ",
                    "showAltRuler": false
                },
                "fromConnection": {
                    "type": "junction",
                    "at": 135014,
                    "track": 2150,
                    "sc_name": "1237A",
                    "elr": "PMJ",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 135110,
                    "track": 1150,
                    "sc_name": "1237B",
                    "elr": "PMJ",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 135014,
                        "to": 135110,
                        "yFrom": null,
                        "yTo": null,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "toConnection": null,
                "tid": 1100,
                "altRoute": {
                    "elr": "WDU",
                    "showAltRuler": true
                },
                "shape": [
                    {
                        "from": 138682,
                        "to": 140120,
                        "yFrom": 47,
                        "yTo": 47,
                        "electrification": "none"
                    }
                ],
                "fromConnection": {
                    "type": "junction",
                    "at": 138682,
                    "track": 1150,
                    "sc_name": "1269",
                    "elr": "PMJ",
                    "connectionLink": null
                }
            },
            {
                "toConnection": null,
                "tid": 2100,
                "altRoute": {
                    "elr": "WDU",
                    "showAltRuler": true
                },
                "shape": [
                    {
                        "from": 138682,
                        "to": 140130,
                        "yFrom": 46,
                        "yTo": 46,
                        "electrification": "none"
                    }
                ],
                "fromConnection": {
                    "type": "junction",
                    "at": 138682,
                    "track": 2150,
                    "sc_name": "1268",
                    "elr": "PMJ",
                    "connectionLink": null
                }
            },
            {
                "altRoute": null,
                "tid": 2200,
                "fromConnection": {
                    "type": "junction",
                    "at": 143901,
                    "track": 1150,
                    "sc_name": "1281",
                    "elr": "PMJ",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 143901,
                        "to": 143945,
                        "yFrom": null,
                        "yTo": 48,
                        "electrification": "overhead"
                    },
                    {
                        "from": 143945,
                        "to": 175529,
                        "yFrom": 48,
                        "yTo": 48,
                        "electrification": "overhead"
                    },
                    {
                        "from": 175529,
                        "to": 175573,
                        "yFrom": 48,
                        "yTo": null,
                        "electrification": "overhead"
                    }
                ],
                "toConnection": {
                    "type": "junction",
                    "at": 175573,
                    "track": 2100,
                    "sc_name": "1315",
                    "elr": "ECM1",
                    "connectionLink": null
                }
            },
            {
                "tid": 3700,
                "altRoute": {
                    "elr": "PMJ",
                    "showAltRuler": false
                },
                "fromConnection": {
                    "type": "junction",
                    "at": 143800,
                    "track": 2150,
                    "sc_name": "1280A",
                    "elr": "PMJ",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 143876,
                    "track": 1150,
                    "sc_name": "1280B",
                    "elr": "PMJ",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 143800,
                        "to": 143876,
                        "yFrom": null,
                        "yTo": null,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "fromConnection": null,
                "toConnection": null,
                "tid": 2100,
                "altRoute": {
                    "elr": "PMJ",
                    "showAltRuler": true
                },
                "shape": [
                    {
                        "from": 143800,
                        "to": 145640,
                        "yFrom": 46,
                        "yTo": 46,
                        "electrification": "none"
                    }
                ]
            },
            {
                "tid": 1100,
                "altRoute": {
                    "elr": "PMJ",
                    "showAltRuler": false
                },
                "fromConnection": null,
                "toConnection": null,
                "shape": [
                    {
                        "from": 143901,
                        "to": 145640,
                        "yFrom": 47,
                        "yTo": 47,
                        "electrification": "none"
                    }
                ]
            },
            {
                "tid": 3900,
                "altRoute": {
                    "elr": "PMJ",
                    "showAltRuler": false
                },
                "fromConnection": {
                    "type": "junction",
                    "at": 134858,
                    "track": 2150,
                    "sc_name": "1236A",
                    "elr": "PMJ",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "buffer_stop",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 134858,
                        "to": 134902,
                        "yFrom": null,
                        "yTo": 46,
                        "electrification": "none"
                    },
                    {
                        "from": 134902,
                        "to": 135146,
                        "yFrom": 46,
                        "yTo": 46,
                        "electrification": "none"
                    }
                ]
            },
            {
                "fromConnection": null,
                "tid": 1100,
                "altRoute": {
                    "elr": "EMP",
                    "showAltRuler": true
                },
                "toConnection": {
                    "type": "junction",
                    "at": 134663,
                    "track": 2201,
                    "sc_name": "1229",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 133914,
                        "to": 133980,
                        "yFrom": 45,
                        "yTo": 45,
                        "electrification": "none"
                    },
                    {
                        "from": 133980,
                        "to": 134134,
                        "yFrom": 45,
                        "yTo": 46,
                        "electrification": "none"
                    },
                    {
                        "from": 134134,
                        "to": 134619,
                        "yFrom": 46,
                        "yTo": 46,
                        "electrification": "none"
                    },
                    {
                        "from": 134619,
                        "to": 134663,
                        "yFrom": 46,
                        "yTo": null,
                        "electrification": "none"
                    }
                ]
            },
            {
                "fromConnection": null,
                "tid": 2100,
                "altRoute": {
                    "elr": "EMP",
                    "showAltRuler": true
                },
                "toConnection": {
                    "type": "junction",
                    "at": 134833,
                    "track": 2150,
                    "sc_name": "1231",
                    "elr": "PMJ",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 133914,
                        "to": 133980,
                        "yFrom": 44,
                        "yTo": 44,
                        "electrification": "none"
                    },
                    {
                        "from": 133980,
                        "to": 134134,
                        "yFrom": 44,
                        "yTo": 45,
                        "electrification": "none"
                    },
                    {
                        "from": 134134,
                        "to": 134757,
                        "yFrom": 45,
                        "yTo": 45,
                        "electrification": "none"
                    },
                    {
                        "from": 134757,
                        "to": 134833,
                        "yFrom": 45,
                        "yTo": null,
                        "electrification": "none"
                    }
                ]
            },
            {
                "tid": 3700,
                "altRoute": null,
                "fromConnection": {
                    "type": "junction",
                    "at": 124772,
                    "track": 1100,
                    "sc_name": "1170A",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 124869,
                    "track": 2100,
                    "sc_name": "1170B",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 124772,
                        "to": 124869,
                        "yFrom": null,
                        "yTo": null,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 3700,
                "altRoute": null,
                "fromConnection": {
                    "type": "junction",
                    "at": 124923,
                    "track": 2100,
                    "sc_name": "1171A",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 125047,
                    "track": 1100,
                    "sc_name": "1171B",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 124923,
                        "to": 125047,
                        "yFrom": null,
                        "yTo": null,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "altRoute": null,
                "tid": 1200,
                "fromConnection": {
                    "type": "junction",
                    "at": 178775,
                    "track": 1100,
                    "sc_name": "2101",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 184821,
                    "track": 1100,
                    "sc_name": "2103B",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 178775,
                        "to": 178829,
                        "yFrom": null,
                        "yTo": 51,
                        "electrification": "overhead"
                    },
                    {
                        "from": 178829,
                        "to": 184744,
                        "yFrom": 51,
                        "yTo": 51,
                        "electrification": "overhead"
                    },
                    {
                        "from": 184744,
                        "to": 184821,
                        "yFrom": 51,
                        "yTo": null,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 3700,
                "altRoute": null,
                "fromConnection": {
                    "type": "junction",
                    "at": 184838,
                    "track": 1100,
                    "sc_name": "2104A",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 184904,
                    "track": 2100,
                    "sc_name": "2104B",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 184838,
                        "to": 184904,
                        "yFrom": null,
                        "yTo": null,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "altRoute": null,
                "tid": 3200,
                "fromConnection": {
                    "type": "junction",
                    "at": 184921,
                    "track": 2100,
                    "sc_name": "2105",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 187208,
                    "track": 2100,
                    "sc_name": "2118",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 184921,
                        "to": 184961,
                        "yFrom": null,
                        "yTo": 48,
                        "electrification": "overhead"
                    },
                    {
                        "from": 184961,
                        "to": 185350,
                        "yFrom": 48,
                        "yTo": 48,
                        "electrification": "overhead"
                    },
                    {
                        "from": 185350,
                        "to": 185394,
                        "yFrom": 48,
                        "yTo": 47,
                        "electrification": "overhead"
                    },
                    {
                        "from": 185394,
                        "to": 185900,
                        "yFrom": 47,
                        "yTo": 47,
                        "electrification": "overhead"
                    },
                    {
                        "from": 185900,
                        "to": 185944,
                        "yFrom": 47,
                        "yTo": 48,
                        "electrification": "overhead"
                    },
                    {
                        "from": 185944,
                        "to": 187164,
                        "yFrom": 48,
                        "yTo": 48,
                        "electrification": "overhead"
                    },
                    {
                        "from": 187164,
                        "to": 187208,
                        "yFrom": 48,
                        "yTo": null,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "altRoute": null,
                "tid": 3603,
                "fromConnection": {
                    "type": "buffer_stop",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 185828,
                    "track": 3200,
                    "sc_name": "2113",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 185621,
                        "to": 185784,
                        "yFrom": 48,
                        "yTo": 48,
                        "electrification": "none"
                    },
                    {
                        "from": 185784,
                        "to": 185828,
                        "yFrom": 48,
                        "yTo": null,
                        "electrification": "none"
                    }
                ]
            },
            {
                "tid": 3700,
                "altRoute": null,
                "fromConnection": {
                    "type": "junction",
                    "at": 191865,
                    "track": 1100,
                    "sc_name": "2126A",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 191974,
                    "track": 2100,
                    "sc_name": "2126B",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 191865,
                        "to": 191974,
                        "yFrom": null,
                        "yTo": null,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 3700,
                "altRoute": null,
                "fromConnection": {
                    "type": "junction",
                    "at": 191996,
                    "track": 2100,
                    "sc_name": "2120A",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 192105,
                    "track": 1100,
                    "sc_name": "2120B",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 191996,
                        "to": 192105,
                        "yFrom": null,
                        "yTo": null,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 3800,
                "altRoute": {
                    "elr": "HOS",
                    "showAltRuler": false
                },
                "toConnection": {
                    "type": "buffer_stop",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 333682,
                        "to": 333726,
                        "yFrom": null,
                        "yTo": 48,
                        "electrification": "none"
                    },
                    {
                        "from": 333726,
                        "to": 334205,
                        "yFrom": 48,
                        "yTo": 48,
                        "electrification": "none"
                    }
                ],
                "fromConnection": {
                    "type": "junction",
                    "at": 333682,
                    "track": 1802,
                    "elr": "HOS",
                    "connectionLink": null
                }
            },
            {
                "fromConnection": null,
                "tid": 1802,
                "altRoute": {
                    "elr": "HOS",
                    "showAltRuler": true
                },
                "shape": [
                    {
                        "from": 333542,
                        "to": 334302,
                        "yFrom": 47,
                        "yTo": null,
                        "electrification": "none"
                    }
                ],
                "toConnection": {
                    "type": "junction",
                    "at": 334302,
                    "track": 1801,
                    "sc_name": "798",
                    "elr": "HOS",
                    "connectionLink": null
                }
            },
            {
                "tid": 1801,
                "altRoute": {
                    "elr": "HOS",
                    "showAltRuler": true
                },
                "shape": [
                    {
                        "from": 333646,
                        "to": 333690,
                        "yFrom": null,
                        "yTo": 46,
                        "electrification": "none"
                    },
                    {
                        "from": 333690,
                        "to": 334258,
                        "yFrom": 46,
                        "yTo": 46,
                        "electrification": "none"
                    },
                    {
                        "from": 334258,
                        "to": 334302,
                        "yFrom": 46,
                        "yTo": 47,
                        "electrification": "none"
                    },
                    {
                        "from": 334302,
                        "to": 334407,
                        "yFrom": 47,
                        "yTo": 47,
                        "electrification": "none"
                    }
                ],
                "toConnection": {
                    "type": "junction",
                    "at": 334407,
                    "track": 1200,
                    "sc_name": "833B",
                    "elr": "HOS",
                    "connectionLink": null
                },
                "fromConnection": {
                    "type": "junction",
                    "at": 333646,
                    "track": 1802,
                    "sc_name": "57",
                    "elr": "HOS",
                    "connectionLink": null
                }
            },
            {
                "fromConnection": null,
                "tid": 1200,
                "altRoute": {
                    "elr": "HOS",
                    "showAltRuler": true
                },
                "toConnection": {
                    "type": "junction",
                    "at": 334470,
                    "track": 1200,
                    "sc_name": "832B",
                    "elr": "ECM1",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 333542,
                        "to": 334312,
                        "yFrom": 45,
                        "yTo": 45,
                        "electrification": "overhead"
                    },
                    {
                        "from": 334312,
                        "to": 334407,
                        "yFrom": 45,
                        "yTo": 47,
                        "electrification": "overhead"
                    },
                    {
                        "from": 334407,
                        "to": 334470,
                        "yFrom": 47,
                        "yTo": null,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "fromConnection": null,
                "tid": 2200,
                "altRoute": {
                    "elr": "HOS",
                    "showAltRuler": false
                },
                "shape": [
                    {
                        "from": 333542,
                        "to": 334334,
                        "yFrom": 44,
                        "yTo": 44,
                        "electrification": "overhead"
                    },
                    {
                        "from": 334334,
                        "to": 334611,
                        "yFrom": 44,
                        "yTo": null,
                        "electrification": "overhead"
                    }
                ],
                "toConnection": {
                    "type": "junction",
                    "at": 334611,
                    "track": 2200,
                    "sc_name": "834B",
                    "elr": "ECM5",
                    "connectionLink": null
                }
            },
            {
                "fromConnection": null,
                "tid": 2901,
                "altRoute": {
                    "elr": "HOS",
                    "showAltRuler": true
                },
                "toConnection": {
                    "type": "junction",
                    "at": 334647,
                    "track": 2200,
                    "sc_name": "841B",
                    "elr": "ECM5",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 333542,
                        "to": 334356,
                        "yFrom": 43,
                        "yTo": 43,
                        "electrification": "overhead"
                    },
                    {
                        "from": 334356,
                        "to": 334647,
                        "yFrom": 43,
                        "yTo": null,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 1100,
                "altRoute": {
                    "elr": "HAY1",
                    "showAltRuler": false
                },
                "fromConnection": {
                    "type": "junction",
                    "at": 334832,
                    "track": 3100,
                    "sc_name": "845",
                    "elr": "HAY1",
                    "connectionLink": null
                },
                "toConnection": null,
                "shape": [
                    {
                        "from": 334832,
                        "to": 334928,
                        "yFrom": 46,
                        "yTo": 46,
                        "electrification": "none"
                    }
                ]
            },
            {
                "toConnection": null,
                "tid": 2100,
                "altRoute": {
                    "elr": "HAY1",
                    "showAltRuler": false
                },
                "fromConnection": {
                    "type": "junction",
                    "at": 334832,
                    "track": 3100,
                    "sc_name": "845",
                    "elr": "HAY1",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 334832,
                        "to": 334876,
                        "yFrom": 46,
                        "yTo": 45,
                        "electrification": "none"
                    },
                    {
                        "from": 334876,
                        "to": 334928,
                        "yFrom": 45,
                        "yTo": 45,
                        "electrification": "none"
                    }
                ]
            },
            {
                "tid": 3700,
                "altRoute": {
                    "elr": "HOS",
                    "showAltRuler": false
                },
                "fromConnection": {
                    "type": "junction",
                    "at": 333603,
                    "track": 1200,
                    "sc_name": "796A",
                    "elr": "HOS",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 333659,
                    "track": 2200,
                    "sc_name": "796B",
                    "elr": "HOS",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 333603,
                        "to": 333659,
                        "yFrom": null,
                        "yTo": null,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 2700,
                "altRoute": {
                    "elr": "HOS",
                    "showAltRuler": false
                },
                "fromConnection": {
                    "type": "junction",
                    "at": 333670,
                    "track": 2200,
                    "sc_name": "797A",
                    "elr": "HOS",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 333723,
                    "track": 2901,
                    "sc_name": "797B",
                    "elr": "HOS",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 333670,
                        "to": 333723,
                        "yFrom": null,
                        "yTo": null,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 3602,
                "altRoute": {
                    "elr": "YMS",
                    "showAltRuler": false
                },
                "fromConnection": {
                    "type": "buffer",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 332145,
                    "track": 3804,
                    "sc_name": "821",
                    "elr": "YMS",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 331860,
                        "to": 332118,
                        "yFrom": 53,
                        "yTo": 53,
                        "electrification": "none"
                    },
                    {
                        "from": 332118,
                        "to": 332145,
                        "yFrom": 53,
                        "yTo": null,
                        "electrification": "none"
                    }
                ]
            },
            {
                "tid": 3900,
                "altRoute": {
                    "elr": "YMS",
                    "showAltRuler": false
                },
                "fromConnection": {
                    "type": "buffer",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 332117,
                    "track": 3602,
                    "sc_name": "820B",
                    "elr": "YMS",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 331861,
                        "to": 332095,
                        "yFrom": 54,
                        "yTo": 54,
                        "electrification": "none"
                    },
                    {
                        "from": 332095,
                        "to": 332117,
                        "yFrom": 54,
                        "yTo": null,
                        "electrification": "none"
                    }
                ]
            },
            {
                "tid": 3700,
                "altRoute": null,
                "fromConnection": {
                    "type": "junction",
                    "at": 370328,
                    "track": 2100,
                    "sc_name": "872A",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 370478,
                    "track": 2200,
                    "sc_name": "872B",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 370328,
                        "to": 370478,
                        "yFrom": null,
                        "yTo": null,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 3701,
                "altRoute": null,
                "fromConnection": {
                    "type": "junction",
                    "at": 370328,
                    "track": 1100,
                    "sc_name": "871A",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 370489,
                    "track": 1200,
                    "sc_name": "871B",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 370328,
                        "to": 370489,
                        "yFrom": null,
                        "yTo": null,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 3700,
                "altRoute": null,
                "fromConnection": {
                    "type": "junction",
                    "at": 371222,
                    "track": 1100,
                    "sc_name": "873A",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 371287,
                    "track": 2100,
                    "sc_name": "873B",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 371222,
                        "to": 371287,
                        "yFrom": null,
                        "yTo": null,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "altRoute": null,
                "tid": 3700,
                "fromConnection": {
                    "type": "junction",
                    "at": 371935,
                    "track": 2200,
                    "sc_name": "875A",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 372031,
                    "track": 2100,
                    "sc_name": "875B",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 371935,
                        "to": 372031,
                        "yFrom": null,
                        "yTo": null,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "altRoute": null,
                "tid": 3901,
                "fromConnection": {
                    "type": "buffer",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 371719,
                    "track": 3900,
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 371213,
                        "to": 371674,
                        "yFrom": 46,
                        "yTo": 46,
                        "electrification": "none"
                    },
                    {
                        "from": 371674,
                        "to": 371719,
                        "yFrom": 46,
                        "yTo": 47,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "altRoute": null,
                "tid": 3900,
                "fromConnection": {
                    "type": "junction",
                    "at": 371313,
                    "track": 3901,
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 371820,
                    "track": 2200,
                    "sc_name": "874B",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 371313,
                        "to": 371357,
                        "yFrom": 46,
                        "yTo": 47,
                        "electrification": "none"
                    },
                    {
                        "from": 371357,
                        "to": 371719,
                        "yFrom": 47,
                        "yTo": 47,
                        "electrification": "none"
                    },
                    {
                        "from": 371719,
                        "to": 371776,
                        "yFrom": 47,
                        "yTo": 47,
                        "electrification": "overhead"
                    },
                    {
                        "from": 371776,
                        "to": 371820,
                        "yFrom": 47,
                        "yTo": null,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "altRoute": null,
                "tid": 3902,
                "fromConnection": {
                    "type": "buffer_stop",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 371674,
                    "track": 3901,
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 371582,
                        "to": 371630,
                        "yFrom": 45,
                        "yTo": 45,
                        "electrification": "overhead"
                    },
                    {
                        "from": 371630,
                        "to": 371674,
                        "yFrom": 45,
                        "yTo": null,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "toConnection": null,
                "tid": 1500,
                "altRoute": {
                    "elr": "LLP3",
                    "showAltRuler": true
                },
                "fromConnection": {
                    "type": "junction",
                    "at": 382837,
                    "track": 1200,
                    "sc_name": "883",
                    "elr": "ECM5",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 382837,
                        "to": 382881,
                        "yFrom": null,
                        "yTo": 52,
                        "electrification": "none"
                    },
                    {
                        "from": 382881,
                        "to": 384075,
                        "yFrom": 52,
                        "yTo": 52,
                        "electrification": "none"
                    },
                    {
                        "from": 384075,
                        "to": 384262,
                        "yFrom": 52,
                        "yTo": 47,
                        "electrification": "none"
                    },
                    {
                        "from": 384262,
                        "to": 384410,
                        "yFrom": 47,
                        "yTo": 47,
                        "electrification": "none"
                    }
                ]
            },
            {
                "fromConnection": null,
                "toConnection": null,
                "tid": 2500,
                "altRoute": {
                    "elr": "LLP1",
                    "showAltRuler": false
                },
                "shape": [
                    {
                        "from": 382731,
                        "to": 384032,
                        "yFrom": 48,
                        "yTo": 48,
                        "electrification": "none"
                    },
                    {
                        "from": 384032,
                        "to": 384131,
                        "yFrom": 48,
                        "yTo": 46,
                        "electrification": "none"
                    },
                    {
                        "from": 384131,
                        "to": 384410,
                        "yFrom": 46,
                        "yTo": 46,
                        "electrification": "none"
                    }
                ]
            },
            {
                "tid": 3700,
                "altRoute": null,
                "fromConnection": {
                    "type": "junction",
                    "at": 384115,
                    "track": 1100,
                    "sc_name": "885A",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 384222,
                    "track": 2100,
                    "sc_name": "885B",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 384115,
                        "to": 384222,
                        "yFrom": null,
                        "yTo": null,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 3700,
                "altRoute": null,
                "fromConnection": {
                    "type": "junction",
                    "at": 384822,
                    "track": 2100,
                    "sc_name": "888A",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 384887,
                    "track": 1100,
                    "sc_name": "888B",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 384822,
                        "to": 384887,
                        "yFrom": null,
                        "yTo": null,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "fromConnection": null,
                "toConnection": null,
                "tid": 1100,
                "altRoute": {
                    "elr": "LLP2",
                    "showAltRuler": true
                },
                "shape": [
                    {
                        "from": 384410,
                        "to": 385054,
                        "yFrom": 47,
                        "yTo": 47,
                        "electrification": "none"
                    },
                    {
                        "from": 385054,
                        "to": 385186,
                        "yFrom": 47,
                        "yTo": 52,
                        "electrification": "none"
                    }
                ]
            },
            {
                "fromConnection": null,
                "toConnection": null,
                "tid": 2100,
                "altRoute": {
                    "elr": "LLP2",
                    "showAltRuler": true
                },
                "shape": [
                    {
                        "from": 384410,
                        "to": 385054,
                        "yFrom": 46,
                        "yTo": 46,
                        "electrification": "none"
                    },
                    {
                        "from": 385054,
                        "to": 385210,
                        "yFrom": 46,
                        "yTo": 52,
                        "electrification": "none"
                    }
                ]
            },
            {
                "toConnection": null,
                "tid": 1100,
                "altRoute": {
                    "elr": "LEN2",
                    "showAltRuler": false
                },
                "fromConnection": {
                    "type": "junction",
                    "at": 384758,
                    "track": 1100,
                    "sc_name": "887",
                    "elr": "ECM5",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 384758,
                        "to": 384846,
                        "yFrom": null,
                        "yTo": 52,
                        "electrification": "none"
                    }
                ]
            },
            {
                "tid": 2100,
                "altRoute": {
                    "elr": "LEN2",
                    "showAltRuler": false
                },
                "fromConnection": {
                    "type": "junction",
                    "at": 384895,
                    "track": 1100,
                    "sc_name": "889",
                    "elr": "ECM5",
                    "connectionLink": null
                },
                "toConnection": null,
                "shape": [
                    {
                        "from": 384895,
                        "to": 384983,
                        "yFrom": null,
                        "yTo": 52,
                        "electrification": "none"
                    }
                ]
            },
            {
                "altRoute": null,
                "tid": 2800,
                "fromConnection": {
                    "type": "junction",
                    "at": 385888,
                    "track": 2100,
                    "sc_name": "897A",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "buffer_stop",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 385888,
                        "to": 385978,
                        "yFrom": null,
                        "yTo": 48,
                        "electrification": "none"
                    },
                    {
                        "from": 385978,
                        "to": 386550,
                        "yFrom": 48,
                        "yTo": 48,
                        "electrification": "none"
                    }
                ]
            },
            {
                "fromConnection": null,
                "tid": 3100,
                "altRoute": {
                    "elr": "REB4",
                    "showAltRuler": true
                },
                "toConnection": {
                    "type": "junction",
                    "at": 385978,
                    "track": 2800,
                    "sc_name": "897B",
                    "elr": "ECM5",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 385694,
                        "to": 385978,
                        "yFrom": 48,
                        "yTo": 48,
                        "electrification": "none"
                    }
                ]
            },
            {
                "tid": 3700,
                "altRoute": null,
                "fromConnection": {
                    "type": "junction",
                    "at": 397636,
                    "track": 2100,
                    "sc_name": "1120A",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 397743,
                    "track": 1100,
                    "sc_name": "1120B",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 397636,
                        "to": 397743,
                        "yFrom": null,
                        "yTo": null,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 3700,
                "altRoute": null,
                "fromConnection": {
                    "type": "junction",
                    "at": 137201,
                    "track": 1200,
                    "sc_name": "1264A",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 137284,
                    "track": 1100,
                    "sc_name": "1264B",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 137201,
                        "to": 137284,
                        "yFrom": null,
                        "yTo": null,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 3700,
                "altRoute": null,
                "fromConnection": {
                    "type": "junction",
                    "at": 137298,
                    "track": 1100,
                    "sc_name": "1265A",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 137374,
                    "track": 2100,
                    "sc_name": "1265B",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 137298,
                        "to": 137374,
                        "yFrom": null,
                        "yTo": null,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 3700,
                "altRoute": null,
                "fromConnection": {
                    "type": "junction",
                    "at": 137389,
                    "track": 2100,
                    "sc_name": "1266A",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 137532,
                    "track": 1150,
                    "sc_name": "1266B",
                    "elr": "PMJ",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 137389,
                        "to": 137532,
                        "yFrom": null,
                        "yTo": null,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 3700,
                "altRoute": {
                    "elr": "PMJ",
                    "showAltRuler": false
                },
                "fromConnection": {
                    "type": "junction",
                    "at": 137543,
                    "track": 1150,
                    "sc_name": "1267A",
                    "elr": "PMJ",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 137619,
                    "track": 2150,
                    "sc_name": "1267B",
                    "elr": "PMJ",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 137543,
                        "to": 137619,
                        "yFrom": null,
                        "yTo": null,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "fromConnection": null,
                "tid": 3200,
                "altRoute": {
                    "elr": "EMP",
                    "showAltRuler": false
                },
                "shape": [
                    {
                        "from": 133914,
                        "to": 133970,
                        "yFrom": 46,
                        "yTo": 46,
                        "electrification": "none"
                    },
                    {
                        "from": 133970,
                        "to": 134134,
                        "yFrom": 46,
                        "yTo": 47,
                        "electrification": "none"
                    },
                    {
                        "from": 134134,
                        "to": 134295,
                        "yFrom": 47,
                        "yTo": null,
                        "electrification": "none"
                    }
                ],
                "toConnection": {
                    "type": "junction",
                    "at": 134295,
                    "track": 2201,
                    "sc_name": "1216B",
                    "elr": "ECM1",
                    "connectionLink": null
                }
            },
            {
                "tid": 3400,
                "altRoute": {
                    "elr": "EMP",
                    "showAltRuler": false
                },
                "fromConnection": {
                    "type": "junction",
                    "at": 133970,
                    "track": 3200,
                    "sc_name": "1213",
                    "elr": "EMP",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 134159,
                    "track": 2200,
                    "sc_name": "1215",
                    "elr": "ECM1",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 133970,
                        "to": 134038,
                        "yFrom": null,
                        "yTo": 47,
                        "electrification": "none"
                    },
                    {
                        "from": 134038,
                        "to": 134159,
                        "yFrom": 47,
                        "yTo": null,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "fromConnection": null,
                "tid": 3300,
                "altRoute": {
                    "elr": "EMP",
                    "showAltRuler": false
                },
                "toConnection": {
                    "type": "junction",
                    "at": 134757,
                    "track": 2100,
                    "sc_name": "1230",
                    "elr": "EMP",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 133914,
                        "to": 133980,
                        "yFrom": 43,
                        "yTo": 43,
                        "electrification": "none"
                    },
                    {
                        "from": 133980,
                        "to": 134134,
                        "yFrom": 43,
                        "yTo": 44,
                        "electrification": "none"
                    },
                    {
                        "from": 134134,
                        "to": 134713,
                        "yFrom": 44,
                        "yTo": 44,
                        "electrification": "none"
                    },
                    {
                        "from": 134713,
                        "to": 134757,
                        "yFrom": 44,
                        "yTo": null,
                        "electrification": "none"
                    }
                ]
            },
            {
                "tid": 3900,
                "altRoute": {
                    "elr": "EMP",
                    "showAltRuler": false
                },
                "fromConnection": null,
                "toConnection": {
                    "type": "junction",
                    "at": 134038,
                    "track": 3400,
                    "sc_name": "1211B",
                    "elr": "EMP",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 133914,
                        "to": 134038,
                        "yFrom": 47,
                        "yTo": null,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "altRoute": null,
                "tid": 3900,
                "fromConnection": {
                    "type": "junction",
                    "at": 134502,
                    "track": 1200,
                    "sc_name": "1228A",
                    "elr": "ECM1",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "buffer_stop",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 134502,
                        "to": 134610,
                        "yFrom": null,
                        "yTo": 53,
                        "electrification": "none"
                    },
                    {
                        "from": 134610,
                        "to": 134768,
                        "yFrom": 53,
                        "yTo": 53,
                        "electrification": "none"
                    }
                ]
            },
            {
                "tid": 3916,
                "altRoute": null,
                "fromConnection": {
                    "type": "junction",
                    "at": 134610,
                    "track": 3900,
                    "sc_name": "1228B",
                    "connectionLink": null
                },
                "toConnection": null,
                "shape": [
                    {
                        "from": 134610,
                        "to": 134714,
                        "yFrom": null,
                        "yTo": 54,
                        "electrification": "none"
                    }
                ]
            },
            {
                "tid": 3917,
                "altRoute": null,
                "fromConnection": {
                    "type": "buffer_stop",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "buffer_stop",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 134509,
                        "to": 134689,
                        "yFrom": 56,
                        "yTo": 56,
                        "electrification": "none"
                    }
                ]
            },
            {
                "altRoute": null,
                "toConnection": null,
                "tid": 3801,
                "fromConnection": {
                    "type": "junction",
                    "at": 135005,
                    "track": 1200,
                    "sc_name": "1245A",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 135005,
                        "to": 135064,
                        "yFrom": null,
                        "yTo": 52,
                        "electrification": "overhead"
                    },
                    {
                        "from": 135064,
                        "to": 135091,
                        "yFrom": 52,
                        "yTo": 53,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 2801,
                "altRoute": null,
                "fromConnection": {
                    "type": "junction",
                    "at": 135064,
                    "track": 3801,
                    "sc_name": "1245B",
                    "connectionLink": null
                },
                "toConnection": null,
                "shape": [
                    {
                        "from": 135064,
                        "to": 135108,
                        "yFrom": null,
                        "yTo": 53,
                        "electrification": "overhead"
                    },
                    {
                        "from": 135108,
                        "to": 135547,
                        "yFrom": 53,
                        "yTo": 53,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 1801,
                "altRoute": null,
                "fromConnection": {
                    "type": "junction",
                    "at": 135091,
                    "track": 3801,
                    "sc_name": "1249A",
                    "connectionLink": null
                },
                "toConnection": null,
                "shape": [
                    {
                        "from": 135091,
                        "to": 135135,
                        "yFrom": null,
                        "yTo": 54,
                        "electrification": "overhead"
                    },
                    {
                        "from": 135135,
                        "to": 135521,
                        "yFrom": 54,
                        "yTo": 54,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 3900,
                "altRoute": null,
                "fromConnection": {
                    "type": "junction",
                    "at": 135091,
                    "track": 3801,
                    "sc_name": "1249A",
                    "connectionLink": null
                },
                "toConnection": null,
                "shape": [
                    {
                        "from": 135091,
                        "to": 135135,
                        "yFrom": null,
                        "yTo": 55,
                        "electrification": "overhead"
                    },
                    {
                        "from": 135135,
                        "to": 135488,
                        "yFrom": 55,
                        "yTo": 55,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 3901,
                "altRoute": null,
                "fromConnection": {
                    "type": "junction",
                    "at": 134601,
                    "track": 3917,
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 135147,
                    "track": 3900,
                    "sc_name": "1249B",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 134601,
                        "to": 134714,
                        "yFrom": null,
                        "yTo": 54,
                        "electrification": "none"
                    },
                    {
                        "from": 134714,
                        "to": 134741,
                        "yFrom": 54,
                        "yTo": 54,
                        "electrification": "none"
                    },
                    {
                        "from": 134741,
                        "to": 134785,
                        "yFrom": 54,
                        "yTo": 53,
                        "electrification": "none"
                    },
                    {
                        "from": 134785,
                        "to": 134960,
                        "yFrom": 53,
                        "yTo": 53,
                        "electrification": "none"
                    },
                    {
                        "from": 134960,
                        "to": 135004,
                        "yFrom": 53,
                        "yTo": 54,
                        "electrification": "none"
                    },
                    {
                        "from": 135004,
                        "to": 135037,
                        "yFrom": 54,
                        "yTo": 55,
                        "electrification": "none"
                    },
                    {
                        "from": 135037,
                        "to": 135147,
                        "yFrom": 55,
                        "yTo": null,
                        "electrification": "none"
                    }
                ]
            },
            {
                "tid": 3914,
                "altRoute": null,
                "fromConnection": {
                    "type": "junction",
                    "at": 134741,
                    "track": 3901,
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 135004,
                    "track": 3901,
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 134741,
                        "to": 135004,
                        "yFrom": null,
                        "yTo": null,
                        "electrification": "none"
                    }
                ]
            },
            {
                "altRoute": null,
                "toConnection": null,
                "tid": 3915,
                "fromConnection": {
                    "type": "junction",
                    "at": 134632,
                    "track": 3917,
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 134632,
                        "to": 134676,
                        "yFrom": null,
                        "yTo": 55,
                        "electrification": "none"
                    },
                    {
                        "from": 134676,
                        "to": 134882,
                        "yFrom": 55,
                        "yTo": 55,
                        "electrification": "none"
                    }
                ]
            },
            {
                "tid": 3913,
                "altRoute": null,
                "fromConnection": null,
                "toConnection": {
                    "type": "junction",
                    "at": 135037,
                    "track": 3901,
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 134913,
                        "to": 135037,
                        "yFrom": 55,
                        "yTo": 55,
                        "electrification": "none"
                    }
                ]
            },
            {
                "tid": 2802,
                "altRoute": null,
                "fromConnection": {
                    "type": "junction",
                    "at": 135547,
                    "track": 2801,
                    "sc_name": "48A",
                    "connectionLink": null
                },
                "toConnection": null,
                "shape": [
                    {
                        "from": 135547,
                        "to": 137079,
                        "yFrom": 53,
                        "yTo": 53,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 3802,
                "altRoute": null,
                "fromConnection": {
                    "type": "junction",
                    "at": 137079,
                    "track": 2802,
                    "sc_name": "1261",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 137196,
                    "track": 1200,
                    "sc_name": "1262B",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 137079,
                        "to": 137137,
                        "yFrom": 53,
                        "yTo": 53,
                        "electrification": "overhead"
                    },
                    {
                        "from": 137137,
                        "to": 137196,
                        "yFrom": 53,
                        "yTo": null,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 1909,
                "altRoute": null,
                "fromConnection": {
                    "type": "junction",
                    "at": 135486,
                    "track": 3900,
                    "connectionLink": null
                },
                "toConnection": null,
                "shape": [
                    {
                        "from": 135486,
                        "to": 135521,
                        "yFrom": 55,
                        "yTo": 55,
                        "electrification": "none"
                    }
                ]
            },
            {
                "tid": 1802,
                "altRoute": null,
                "fromConnection": {
                    "type": "junction",
                    "at": 135521,
                    "track": 1909,
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 137079,
                    "track": 3802,
                    "sc_name": "1261",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 135521,
                        "to": 135540,
                        "yFrom": 55,
                        "yTo": 54,
                        "electrification": "none"
                    },
                    {
                        "from": 135540,
                        "to": 137035,
                        "yFrom": 54,
                        "yTo": 54,
                        "electrification": "overhead"
                    },
                    {
                        "from": 137035,
                        "to": 137079,
                        "yFrom": 54,
                        "yTo": null,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 3700,
                "altRoute": null,
                "fromConnection": {
                    "type": "junction",
                    "at": 135521,
                    "track": 1801,
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 135540,
                    "track": 1802,
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 135521,
                        "to": 135540,
                        "yFrom": null,
                        "yTo": null,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 3700,
                "altRoute": null,
                "fromConnection": {
                    "type": "junction",
                    "at": 139692,
                    "track": 2100,
                    "sc_name": "1271A",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 139800,
                    "track": 1100,
                    "sc_name": "1271B",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 139692,
                        "to": 139800,
                        "yFrom": null,
                        "yTo": null,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 3700,
                "altRoute": null,
                "fromConnection": {
                    "type": "junction",
                    "at": 139818,
                    "track": 1100,
                    "sc_name": "1272A",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 139962,
                    "track": 1200,
                    "sc_name": "1272B",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 139818,
                        "to": 139962,
                        "yFrom": null,
                        "yTo": null,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 2100,
                "altRoute": {
                    "elr": "WEB",
                    "showAltRuler": false
                },
                "fromConnection": {
                    "type": "junction",
                    "at": 139976,
                    "track": 1200,
                    "sc_name": "1273",
                    "connectionLink": null
                },
                "toConnection": null,
                "shape": [
                    {
                        "from": 139976,
                        "to": 140072,
                        "yFrom": null,
                        "yTo": 53,
                        "electrification": "none"
                    }
                ]
            },
            {
                "tid": 1100,
                "altRoute": {
                    "elr": "WEB",
                    "showAltRuler": false
                },
                "fromConnection": {
                    "type": "junction",
                    "at": 139797,
                    "track": 1200,
                    "sc_name": "1274",
                    "connectionLink": null
                },
                "toConnection": null,
                "shape": [
                    {
                        "from": 139797,
                        "to": 139863,
                        "yFrom": null,
                        "yTo": 53,
                        "electrification": "none"
                    }
                ]
            },
            {
                "tid": 3700,
                "altRoute": null,
                "fromConnection": {
                    "type": "junction",
                    "at": 149317,
                    "track": 2200,
                    "sc_name": "1293A",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 149474,
                    "track": 2100,
                    "sc_name": "1293B",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 149317,
                        "to": 149474,
                        "yFrom": null,
                        "yTo": null,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 3701,
                "altRoute": null,
                "fromConnection": {
                    "type": "junction",
                    "at": 149335,
                    "track": 1200,
                    "sc_name": "1294A",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 149470,
                    "track": 1100,
                    "sc_name": "1294B",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 149335,
                        "to": 149470,
                        "yFrom": null,
                        "yTo": null,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 3700,
                "altRoute": null,
                "fromConnection": {
                    "type": "junction",
                    "at": 149489,
                    "track": 2100,
                    "sc_name": "1295A",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 149554,
                    "track": 1100,
                    "sc_name": "1295B",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 149489,
                        "to": 149554,
                        "yFrom": null,
                        "yTo": null,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 3700,
                "altRoute": null,
                "fromConnection": {
                    "type": "junction",
                    "at": 149556,
                    "track": 2100,
                    "sc_name": "1296A",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 149692,
                    "track": 2200,
                    "sc_name": "1296B",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 149556,
                        "to": 149692,
                        "yFrom": null,
                        "yTo": null,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 3701,
                "altRoute": null,
                "fromConnection": {
                    "type": "junction",
                    "at": 149568,
                    "track": 1100,
                    "sc_name": "1297A",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 149704,
                    "track": 1200,
                    "sc_name": "1297B",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 149568,
                        "to": 149704,
                        "yFrom": null,
                        "yTo": null,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 1900,
                "altRoute": null,
                "fromConnection": {
                    "type": "buffer_stop",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "buffer_stop",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 149287,
                        "to": 149976,
                        "yFrom": 52,
                        "yTo": 52,
                        "electrification": "none"
                    }
                ]
            },
            {
                "tid": 1700,
                "altRoute": null,
                "fromConnection": {
                    "type": "junction",
                    "at": 149541,
                    "track": 1900,
                    "sc_name": "3A",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 149634,
                    "track": 1200,
                    "sc_name": "3B",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 149541,
                        "to": 149634,
                        "yFrom": null,
                        "yTo": null,
                        "electrification": "none"
                    }
                ]
            },
            {
                "tid": 1700,
                "altRoute": null,
                "fromConnection": {
                    "type": "junction",
                    "at": 149273,
                    "track": 1200,
                    "sc_name": "3A",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 149339,
                    "track": 1900,
                    "sc_name": "3B",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 149273,
                        "to": 149339,
                        "yFrom": null,
                        "yTo": null,
                        "electrification": "none"
                    }
                ]
            },
            {
                "altRoute": null,
                "tid": 3700,
                "fromConnection": {
                    "type": "junction",
                    "at": 175597,
                    "track": 1100,
                    "sc_name": "1317-3A",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 175692,
                    "track": 2100,
                    "sc_name": "1317-3B",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 175597,
                        "to": 175692,
                        "yFrom": null,
                        "yTo": null,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "altRoute": null,
                "tid": 3700,
                "fromConnection": {
                    "type": "junction",
                    "at": 175717,
                    "track": 2100,
                    "sc_name": "1317-2A",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 175811,
                    "track": 1100,
                    "sc_name": "1317-2B",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 175717,
                        "to": 175811,
                        "yFrom": null,
                        "yTo": null,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "altRoute": null,
                "tid": 1901,
                "fromConnection": {
                    "type": "junction",
                    "at": 184744,
                    "sc_name": "2103A",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "buffer_stop",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 184744,
                        "to": 185134,
                        "yFrom": 51,
                        "yTo": 51,
                        "electrification": "overhead"
                    },
                    {
                        "from": 185134,
                        "to": 185454,
                        "yFrom": 51,
                        "yTo": 51,
                        "electrification": "none"
                    }
                ]
            },
            {
                "toConnection": null,
                "tid": 1100,
                "altRoute": {
                    "elr": "NOG1",
                    "showAltRuler": false
                },
                "fromConnection": {
                    "type": "junction",
                    "at": 186727,
                    "track": 3200,
                    "sc_name": "2117",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 186727,
                        "to": 186771,
                        "yFrom": 48,
                        "yTo": 47,
                        "electrification": "none"
                    },
                    {
                        "from": 186771,
                        "to": 187150,
                        "yFrom": 47,
                        "yTo": 47,
                        "electrification": "none"
                    }
                ]
            },
            {
                "tid": 1500,
                "altRoute": null,
                "fromConnection": {
                    "type": "junction",
                    "at": 201875,
                    "track": 1100,
                    "sc_name": "2152",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 202928,
                    "track": 1100,
                    "sc_name": "2153",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 201875,
                        "to": 201929,
                        "yFrom": null,
                        "yTo": 51,
                        "electrification": "overhead"
                    },
                    {
                        "from": 201929,
                        "to": 202884,
                        "yFrom": 51,
                        "yTo": 51,
                        "electrification": "overhead"
                    },
                    {
                        "from": 202884,
                        "to": 202928,
                        "yFrom": 51,
                        "yTo": null,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 3700,
                "altRoute": null,
                "fromConnection": {
                    "type": "junction",
                    "at": 203024,
                    "track": 1100,
                    "sc_name": "2A",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 203118,
                    "track": 2100,
                    "sc_name": "2B",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 203024,
                        "to": 203118,
                        "yFrom": null,
                        "yTo": null,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 3700,
                "altRoute": null,
                "fromConnection": {
                    "type": "junction",
                    "at": 203143,
                    "track": 2100,
                    "sc_name": "3A",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 203237,
                    "track": 1100,
                    "sc_name": "3B",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 203143,
                        "to": 203237,
                        "yFrom": null,
                        "yTo": null,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 2500,
                "altRoute": null,
                "fromConnection": {
                    "type": "junction",
                    "at": 203419,
                    "track": 2100,
                    "sc_name": "2157",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 204448,
                    "track": 2100,
                    "sc_name": "2159B",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 203419,
                        "to": 203463,
                        "yFrom": null,
                        "yTo": 48,
                        "electrification": "overhead"
                    },
                    {
                        "from": 203463,
                        "to": 204368,
                        "yFrom": 48,
                        "yTo": 48,
                        "electrification": "overhead"
                    },
                    {
                        "from": 204368,
                        "to": 204448,
                        "yFrom": 48,
                        "yTo": null,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "altRoute": null,
                "tid": 1901,
                "fromConnection": {
                    "type": "buffer_stop",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 211229,
                    "track": 3500,
                    "sc_name": "2181B",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 210752,
                        "to": 211229,
                        "yFrom": 51,
                        "yTo": 51,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "altRoute": null,
                "tid": 3500,
                "fromConnection": {
                    "type": "junction",
                    "at": 211152,
                    "track": 1100,
                    "sc_name": "2181A",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 212389,
                    "track": 1100,
                    "sc_name": "2186B",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 211152,
                        "to": 211229,
                        "yFrom": null,
                        "yTo": 51,
                        "electrification": "overhead"
                    },
                    {
                        "from": 211229,
                        "to": 212258,
                        "yFrom": 51,
                        "yTo": 51,
                        "electrification": "overhead"
                    },
                    {
                        "from": 212258,
                        "to": 212389,
                        "yFrom": 51,
                        "yTo": null,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 3100,
                "altRoute": {
                    "elr": "NSE",
                    "showAltRuler": false
                },
                "fromConnection": {
                    "type": "junction",
                    "at": 212258,
                    "track": 3500,
                    "sc_name": "2186A",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 212258,
                        "to": 212520,
                        "yFrom": null,
                        "yTo": 51,
                        "electrification": "none"
                    },
                    {
                        "from": 212520,
                        "to": 212618,
                        "yFrom": 51,
                        "yTo": null,
                        "electrification": "none"
                    }
                ],
                "toConnection": {
                    "type": "junction",
                    "at": 212618,
                    "track": 1100,
                    "sc_name": "2190",
                    "elr": "NOB1",
                    "connectionLink": null
                }
            },
            {
                "tid": 3700,
                "altRoute": null,
                "fromConnection": {
                    "type": "junction",
                    "at": 212443,
                    "track": 1100,
                    "sc_name": "2187A",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 212551,
                    "track": 2100,
                    "sc_name": "2187B",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 212443,
                        "to": 212551,
                        "yFrom": null,
                        "yTo": null,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 3700,
                "altRoute": null,
                "fromConnection": {
                    "type": "junction",
                    "at": 211027,
                    "track": 2100,
                    "sc_name": "2179A",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 211136,
                    "track": 1100,
                    "sc_name": "2179B",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 211027,
                        "to": 211136,
                        "yFrom": null,
                        "yTo": null,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 3300,
                "altRoute": null,
                "fromConnection": {
                    "type": "junction",
                    "at": 211239,
                    "track": 3500,
                    "sc_name": "2182",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 211982,
                    "track": 3500,
                    "sc_name": "2185B",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 211239,
                        "to": 211283,
                        "yFrom": null,
                        "yTo": 52,
                        "electrification": "overhead"
                    },
                    {
                        "from": 211283,
                        "to": 211938,
                        "yFrom": 52,
                        "yTo": 52,
                        "electrification": "overhead"
                    },
                    {
                        "from": 211938,
                        "to": 211982,
                        "yFrom": 52,
                        "yTo": null,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "altRoute": null,
                "tid": 3601,
                "fromConnection": {
                    "type": "junction",
                    "at": 211278,
                    "track": 3300,
                    "sc_name": "2184A",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "buffer_stop",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 211278,
                        "to": 211332,
                        "yFrom": null,
                        "yTo": 53,
                        "electrification": "overhead"
                    },
                    {
                        "from": 211332,
                        "to": 211499,
                        "yFrom": 53,
                        "yTo": 53,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 1100,
                "altRoute": {
                    "elr": "NOB1",
                    "showAltRuler": false
                },
                "fromConnection": null,
                "toConnection": null,
                "shape": [
                    {
                        "from": 212575,
                        "to": 212619,
                        "yFrom": 47,
                        "yTo": 53,
                        "electrification": "none"
                    }
                ]
            },
            {
                "tid": 2100,
                "altRoute": {
                    "elr": "NOB1",
                    "showAltRuler": false
                },
                "fromConnection": null,
                "toConnection": null,
                "shape": [
                    {
                        "from": 212580,
                        "to": 212624,
                        "yFrom": 47,
                        "yTo": 53,
                        "electrification": "none"
                    }
                ]
            },
            {
                "tid": 3700,
                "altRoute": null,
                "fromConnection": {
                    "type": "junction",
                    "at": 220775,
                    "track": 2100,
                    "sc_name": "2A",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 220883,
                    "track": 1100,
                    "sc_name": "2B",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 220775,
                        "to": 220883,
                        "yFrom": null,
                        "yTo": null,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 3700,
                "altRoute": null,
                "fromConnection": {
                    "type": "junction",
                    "at": 220918,
                    "track": 1100,
                    "sc_name": "3A",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 221026,
                    "track": 2100,
                    "sc_name": "3B",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 220918,
                        "to": 221026,
                        "yFrom": null,
                        "yTo": null,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 2500,
                "altRoute": null,
                "fromConnection": {
                    "type": "junction",
                    "at": 221140,
                    "track": 2100,
                    "sc_name": "2203",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "fixed",
                    "at": 222301,
                    "track": 2100,
                    "sc_name": "2205",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 221140,
                        "to": 221184,
                        "yFrom": null,
                        "yTo": 48,
                        "electrification": "overhead"
                    },
                    {
                        "from": 221184,
                        "to": 222257,
                        "yFrom": 48,
                        "yTo": 48,
                        "electrification": "overhead"
                    },
                    {
                        "from": 222257,
                        "to": 222301,
                        "yFrom": 48,
                        "yTo": null,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 1500,
                "altRoute": null,
                "fromConnection": {
                    "type": "junction",
                    "at": 221148,
                    "track": 1100,
                    "sc_name": "2202",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 222301,
                    "track": 1100,
                    "sc_name": "2204",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 221148,
                        "to": 221192,
                        "yFrom": null,
                        "yTo": 51,
                        "electrification": "overhead"
                    },
                    {
                        "from": 221192,
                        "to": 222257,
                        "yFrom": 51,
                        "yTo": 51,
                        "electrification": "overhead"
                    },
                    {
                        "from": 222257,
                        "to": 222301,
                        "yFrom": 51,
                        "yTo": null,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 3700,
                "altRoute": null,
                "fromConnection": {
                    "type": "junction",
                    "at": 11582,
                    "track": 1200,
                    "sc_name": "2160A",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 11726,
                    "track": 1100,
                    "sc_name": "2160B",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 11582,
                        "to": 11726,
                        "yFrom": null,
                        "yTo": null,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 3700,
                "altRoute": null,
                "fromConnection": {
                    "type": "junction",
                    "at": 15617,
                    "track": 1200,
                    "sc_name": "2166A",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 15699,
                    "track": 1100,
                    "sc_name": "2166B",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 15617,
                        "to": 15699,
                        "yFrom": null,
                        "yTo": null,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 3700,
                "altRoute": null,
                "fromConnection": {
                    "type": "junction",
                    "at": 15722,
                    "track": 1100,
                    "sc_name": "2167A",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 15806,
                    "track": 1200,
                    "sc_name": "2167B",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 15722,
                        "to": 15806,
                        "yFrom": null,
                        "yTo": null,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 3701,
                "altRoute": null,
                "fromConnection": {
                    "type": "junction",
                    "at": 15779,
                    "track": 1100,
                    "sc_name": "2168A",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 15845,
                    "track": 2100,
                    "sc_name": "2168B",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 15779,
                        "to": 15845,
                        "yFrom": null,
                        "yTo": null,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 3700,
                "altRoute": null,
                "fromConnection": {
                    "type": "junction",
                    "at": 15866,
                    "track": 2100,
                    "sc_name": "2169A",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 15994,
                    "track": 2200,
                    "sc_name": "2169B",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 15866,
                        "to": 15994,
                        "yFrom": null,
                        "yTo": null,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 3700,
                "altRoute": null,
                "fromConnection": {
                    "type": "junction",
                    "at": 16183,
                    "track": 2200,
                    "sc_name": "2176A",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 16292,
                    "track": 2100,
                    "sc_name": "2176B",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 16183,
                        "to": 16292,
                        "yFrom": null,
                        "yTo": null,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 3700,
                "altRoute": null,
                "fromConnection": {
                    "type": "junction",
                    "at": 21930,
                    "track": 1200,
                    "sc_name": "2180A",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 22078,
                    "track": 1100,
                    "sc_name": "2180B",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 21930,
                        "to": 22078,
                        "yFrom": null,
                        "yTo": null,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 3700,
                "altRoute": null,
                "fromConnection": {
                    "type": "junction",
                    "at": 22092,
                    "track": 1100,
                    "sc_name": "2181A",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 22152,
                    "track": 2100,
                    "sc_name": "2181B",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 22092,
                        "to": 22152,
                        "yFrom": null,
                        "yTo": null,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 3701,
                "altRoute": null,
                "fromConnection": {
                    "type": "junction",
                    "at": 22155,
                    "track": 1100,
                    "sc_name": "2183A",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 22300,
                    "track": 1200,
                    "sc_name": "2183B",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 22155,
                        "to": 22300,
                        "yFrom": null,
                        "yTo": null,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 3700,
                "altRoute": null,
                "fromConnection": {
                    "type": "junction",
                    "at": 22166,
                    "track": 2100,
                    "sc_name": "2182A",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 22288,
                    "track": 2200,
                    "sc_name": "2182B",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 22166,
                        "to": 22288,
                        "yFrom": null,
                        "yTo": null,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 3700,
                "altRoute": null,
                "fromConnection": {
                    "type": "junction",
                    "at": 22892,
                    "track": 2200,
                    "sc_name": "2188A",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 23028,
                    "track": 2100,
                    "sc_name": "2188B",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 22892,
                        "to": 23028,
                        "yFrom": null,
                        "yTo": null,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 3700,
                "altRoute": null,
                "fromConnection": {
                    "type": "junction",
                    "at": 28128,
                    "track": 1100,
                    "sc_name": "2192A",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 28327,
                    "track": 1200,
                    "sc_name": "2192B",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 28128,
                        "to": 28327,
                        "yFrom": null,
                        "yTo": null,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 3700,
                "altRoute": null,
                "fromConnection": {
                    "type": "junction",
                    "at": 31392,
                    "track": 1200,
                    "sc_name": "2195A",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 31528,
                    "track": 1100,
                    "sc_name": "2195B",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 31392,
                        "to": 31528,
                        "yFrom": null,
                        "yTo": null,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 3701,
                "altRoute": null,
                "fromConnection": {
                    "type": "junction",
                    "at": 31567,
                    "track": 2200,
                    "sc_name": "2197A",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 31651,
                    "track": 2100,
                    "sc_name": "2197B",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 31567,
                        "to": 31651,
                        "yFrom": null,
                        "yTo": null,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 1901,
                "altRoute": null,
                "fromConnection": {
                    "type": "buffer_stop",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "buffer_stop",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 35203,
                        "to": 36377,
                        "yFrom": 53,
                        "yTo": 53,
                        "electrification": "none"
                    }
                ]
            },
            {
                "tid": 3700,
                "altRoute": null,
                "fromConnection": {
                    "type": "junction",
                    "at": 35249,
                    "track": 3200,
                    "sc_name": "5508A",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 35311,
                    "track": 1901,
                    "sc_name": "5508B",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 35249,
                        "to": 35311,
                        "yFrom": null,
                        "yTo": null,
                        "electrification": "none"
                    }
                ]
            },
            {
                "tid": 3702,
                "altRoute": null,
                "fromConnection": {
                    "type": "junction",
                    "at": 35542,
                    "track": 2500,
                    "sc_name": "5513A",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 35619,
                    "track": 2200,
                    "sc_name": "5513B",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 35542,
                        "to": 35619,
                        "yFrom": null,
                        "yTo": null,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 3701,
                "altRoute": null,
                "fromConnection": {
                    "type": "junction",
                    "at": 35461,
                    "track": 2100,
                    "sc_name": "5512A",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 35568,
                    "track": 2200,
                    "sc_name": "5512B",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 35461,
                        "to": 35568,
                        "yFrom": null,
                        "yTo": null,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 3700,
                "altRoute": null,
                "fromConnection": {
                    "type": "junction",
                    "at": 35492,
                    "track": 1100,
                    "sc_name": "5516A",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 35583,
                    "track": 1200,
                    "sc_name": "5516B",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 35492,
                        "to": 35583,
                        "yFrom": null,
                        "yTo": null,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 2900,
                "altRoute": null,
                "fromConnection": {
                    "type": "junction",
                    "at": 35881,
                    "track": 2500,
                    "sc_name": "5521A",
                    "connectionLink": null
                },
                "toConnection": null,
                "shape": [
                    {
                        "from": 35881,
                        "to": 36284,
                        "yFrom": 47,
                        "yTo": 47,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 3702,
                "altRoute": null,
                "fromConnection": {
                    "type": "junction",
                    "at": 36041,
                    "track": 2200,
                    "sc_name": "5522A",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 36131,
                    "track": 2900,
                    "sc_name": "5522B",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 36041,
                        "to": 36131,
                        "yFrom": null,
                        "yTo": null,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 3701,
                "altRoute": null,
                "fromConnection": {
                    "type": "junction",
                    "at": 36085,
                    "track": 2200,
                    "sc_name": "5529A",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 36179,
                    "track": 2100,
                    "sc_name": "5529B",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 36085,
                        "to": 36179,
                        "yFrom": null,
                        "yTo": null,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 3700,
                "altRoute": null,
                "fromConnection": {
                    "type": "junction",
                    "at": 36082,
                    "track": 1200,
                    "sc_name": "5530A",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 36174,
                    "track": 1100,
                    "sc_name": "5530B",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 36082,
                        "to": 36174,
                        "yFrom": null,
                        "yTo": null,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 3700,
                "altRoute": null,
                "fromConnection": {
                    "type": "junction",
                    "at": 36201,
                    "track": 1100,
                    "sc_name": "5531A",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 36274,
                    "track": 2100,
                    "sc_name": "5531B",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 36201,
                        "to": 36274,
                        "yFrom": null,
                        "yTo": null,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 3700,
                "altRoute": null,
                "fromConnection": {
                    "type": "junction",
                    "at": 36296,
                    "track": 2100,
                    "sc_name": "5532A",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 36389,
                    "track": 2200,
                    "sc_name": "5532B",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 36296,
                        "to": 36389,
                        "yFrom": null,
                        "yTo": null,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "altRoute": null,
                "tid": 3700,
                "fromConnection": {
                    "type": "junction",
                    "at": 35839,
                    "track": 1901,
                    "sc_name": "5526A",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 35899,
                    "track": 1500,
                    "sc_name": "5526B",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 35839,
                        "to": 35899,
                        "yFrom": null,
                        "yTo": null,
                        "electrification": "none"
                    }
                ]
            },
            {
                "altRoute": null,
                "tid": 2900,
                "fromConnection": {
                    "type": "junction",
                    "at": 37195,
                    "track": 2200,
                    "sc_name": "5561A",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "buffer_stop",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 37195,
                        "to": 37292,
                        "yFrom": 48,
                        "yTo": 48,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 3700,
                "altRoute": null,
                "fromConnection": {
                    "type": "junction",
                    "at": 41739,
                    "track": 1100,
                    "sc_name": "5566A",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 41799,
                    "track": 2100,
                    "sc_name": "5566B",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 41739,
                        "to": 41799,
                        "yFrom": null,
                        "yTo": null,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 3700,
                "altRoute": null,
                "fromConnection": {
                    "type": "junction",
                    "at": 48178,
                    "track": 2100,
                    "sc_name": "5609A",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 48353,
                    "track": 2200,
                    "sc_name": "5609B",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 48178,
                        "to": 48353,
                        "yFrom": null,
                        "yTo": null,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 3701,
                "altRoute": null,
                "fromConnection": {
                    "type": "junction",
                    "at": 48178,
                    "track": 1100,
                    "sc_name": "5610A",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 48352,
                    "track": 1200,
                    "sc_name": "5610B",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 48178,
                        "to": 48352,
                        "yFrom": null,
                        "yTo": null,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 3700,
                "altRoute": null,
                "fromConnection": {
                    "type": "junction",
                    "at": 48712,
                    "track": 2200,
                    "sc_name": "5612A",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 48883,
                    "track": 2100,
                    "sc_name": "5612B",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 48712,
                        "to": 48883,
                        "yFrom": null,
                        "yTo": null,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 3701,
                "altRoute": null,
                "fromConnection": {
                    "type": "junction",
                    "at": 48712,
                    "track": 1200,
                    "sc_name": "5613A",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 48883,
                    "track": 1100,
                    "sc_name": "5613B",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 48712,
                        "to": 48883,
                        "yFrom": null,
                        "yTo": null,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 3700,
                "altRoute": null,
                "fromConnection": {
                    "type": "junction",
                    "at": 48930,
                    "track": 1100,
                    "sc_name": "5614A",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 48991,
                    "track": 2100,
                    "sc_name": "5614B",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 48930,
                        "to": 48991,
                        "yFrom": null,
                        "yTo": null,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 3605,
                "altRoute": {
                    "elr": "HDB",
                    "showAltRuler": false
                },
                "fromConnection": {
                    "type": "junction",
                    "at": 46948,
                    "track": 2100,
                    "sc_name": "5604A",
                    "elr": "HDB",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "buffer_stop",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 46948,
                        "to": 48525,
                        "yFrom": 47,
                        "yTo": 47,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 3700,
                "altRoute": {
                    "elr": "HDB",
                    "showAltRuler": false
                },
                "fromConnection": {
                    "type": "junction",
                    "at": 46948,
                    "track": 3605,
                    "sc_name": "5604A",
                    "elr": "HDB",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 47089,
                    "track": 2200,
                    "sc_name": "5604B",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 46948,
                        "to": 47089,
                        "yFrom": null,
                        "yTo": null,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "fromConnection": null,
                "tid": 2100,
                "altRoute": {
                    "elr": "HDB",
                    "showAltRuler": false
                },
                "toConnection": {
                    "type": "junction",
                    "at": 46948,
                    "track": 3605,
                    "sc_name": "5604A",
                    "elr": "HDB",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 45980,
                        "to": 46233,
                        "yFrom": 52,
                        "yTo": 52,
                        "electrification": "overhead"
                    },
                    {
                        "from": 46233,
                        "to": 46332,
                        "yFrom": 52,
                        "yTo": 47,
                        "electrification": "overhead"
                    },
                    {
                        "from": 46332,
                        "to": 46948,
                        "yFrom": 47,
                        "yTo": 47,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 1100,
                "altRoute": {
                    "elr": "HDB",
                    "showAltRuler": false
                },
                "fromConnection": null,
                "toConnection": {
                    "type": "junction",
                    "at": 46745,
                    "track": 1200,
                    "sc_name": "5603",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 45980,
                        "to": 46596,
                        "yFrom": 53,
                        "yTo": 53,
                        "electrification": "overhead"
                    },
                    {
                        "from": 46596,
                        "to": 46745,
                        "yFrom": 53,
                        "yTo": null,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 1901,
                "altRoute": null,
                "fromConnection": {
                    "type": "buffer_stop",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 46964,
                    "track": 3900,
                    "sc_name": "5605B",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 46819,
                        "to": 46964,
                        "yFrom": 52,
                        "yTo": 52,
                        "electrification": "none"
                    }
                ]
            },
            {
                "altRoute": null,
                "tid": 3900,
                "fromConnection": {
                    "type": "junction",
                    "at": 46904,
                    "track": 1200,
                    "sc_name": "5605A",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "buffer_stop",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 46904,
                        "to": 46964,
                        "yFrom": null,
                        "yTo": 52,
                        "electrification": "none"
                    },
                    {
                        "from": 46964,
                        "to": 47540,
                        "yFrom": 52,
                        "yTo": 52,
                        "electrification": "none"
                    }
                ]
            },
            {
                "tid": 3701,
                "altRoute": null,
                "fromConnection": {
                    "type": "junction",
                    "at": 54944,
                    "track": 1100,
                    "sc_name": "5805A",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 55150,
                    "track": 1200,
                    "sc_name": "5805B",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 54944,
                        "to": 55150,
                        "yFrom": null,
                        "yTo": null,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "altRoute": null,
                "tid": 3700,
                "fromConnection": {
                    "type": "junction",
                    "at": 54947,
                    "track": 2100,
                    "sc_name": "5804A",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 55173,
                    "track": 2200,
                    "sc_name": "5804B",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 54947,
                        "to": 55173,
                        "yFrom": null,
                        "yTo": null,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 3700,
                "altRoute": null,
                "fromConnection": {
                    "type": "junction",
                    "at": 56286,
                    "track": 2200,
                    "sc_name": "5809A",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 56372,
                    "track": 2100,
                    "sc_name": "5809B",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 56286,
                        "to": 56372,
                        "yFrom": null,
                        "yTo": null,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 3701,
                "altRoute": null,
                "fromConnection": {
                    "type": "junction",
                    "at": 56403,
                    "track": 2100,
                    "sc_name": "5812A",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 56512,
                    "track": 1100,
                    "sc_name": "5812B",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 56403,
                        "to": 56512,
                        "yFrom": null,
                        "yTo": null,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 3700,
                "altRoute": null,
                "fromConnection": {
                    "type": "junction",
                    "at": 56479,
                    "track": 2100,
                    "sc_name": "5814A",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 56695,
                    "track": 2200,
                    "sc_name": "5814B",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 56479,
                        "to": 56695,
                        "yFrom": null,
                        "yTo": null,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "altRoute": null,
                "tid": 3702,
                "fromConnection": {
                    "type": "junction",
                    "at": 56473,
                    "track": 1200,
                    "sc_name": "5813A",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 56571,
                    "track": 1100,
                    "sc_name": "5813B",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 56473,
                        "to": 56571,
                        "yFrom": null,
                        "yTo": null,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "altRoute": null,
                "tid": 3900,
                "fromConnection": {
                    "type": "junction",
                    "at": 55648,
                    "track": 1200,
                    "sc_name": "5807A",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "buffer_stop",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 55648,
                        "to": 55692,
                        "yFrom": null,
                        "yTo": 53,
                        "electrification": "none"
                    },
                    {
                        "from": 55692,
                        "to": 55863,
                        "yFrom": 53,
                        "yTo": 53,
                        "electrification": "none"
                    },
                    {
                        "from": 55863,
                        "to": 55900,
                        "yFrom": 53,
                        "yTo": 52,
                        "electrification": "none"
                    },
                    {
                        "from": 55900,
                        "to": 55919,
                        "yFrom": 52,
                        "yTo": 52,
                        "electrification": "none"
                    }
                ]
            },
            {
                "tid": 1100,
                "altRoute": {
                    "elr": "SBR",
                    "showAltRuler": false
                },
                "fromConnection": {
                    "type": "junction",
                    "at": 56575,
                    "track": 1200,
                    "sc_name": "5816",
                    "connectionLink": null
                },
                "toConnection": null,
                "shape": [
                    {
                        "from": 56575,
                        "to": 56625,
                        "yFrom": null,
                        "yTo": 53,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 2100,
                "altRoute": {
                    "elr": "SBR",
                    "showAltRuler": false
                },
                "fromConnection": {
                    "type": "junction",
                    "at": 56575,
                    "track": 1100,
                    "sc_name": "5817",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 56659,
                    "track": 1200,
                    "sc_name": "5818A",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 56575,
                        "to": 56659,
                        "yFrom": null,
                        "yTo": null,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 2100,
                "altRoute": {
                    "elr": "SBR",
                    "showAltRuler": false
                },
                "fromConnection": {
                    "type": "junction",
                    "at": 56659,
                    "track": 1200,
                    "sc_name": "5818B",
                    "connectionLink": null
                },
                "toConnection": null,
                "shape": [
                    {
                        "from": 56659,
                        "to": 56709,
                        "yFrom": null,
                        "yTo": 53,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 3902,
                "altRoute": null,
                "fromConnection": {
                    "type": "junction",
                    "at": 55863,
                    "track": 3900,
                    "connectionLink": null
                },
                "toConnection": null,
                "shape": [
                    {
                        "from": 55863,
                        "to": 56239,
                        "yFrom": 53,
                        "yTo": 53,
                        "electrification": "none"
                    }
                ]
            },
            {
                "altRoute": null,
                "toConnection": null,
                "tid": 3900,
                "fromConnection": {
                    "type": "junction",
                    "at": 56239,
                    "track": 3902,
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 56239,
                        "to": 56364,
                        "yFrom": 53,
                        "yTo": 52,
                        "electrification": "none"
                    },
                    {
                        "from": 56364,
                        "to": 56579,
                        "yFrom": 52,
                        "yTo": 52,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 3901,
                "altRoute": null,
                "fromConnection": {
                    "type": "junction",
                    "at": 56290,
                    "track": 1200,
                    "sc_name": "5810A",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 56364,
                    "track": 3900,
                    "sc_name": "5810B",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 56290,
                        "to": 56364,
                        "yFrom": null,
                        "yTo": null,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "altRoute": null,
                "tid": 2901,
                "fromConnection": {
                    "type": "buffer_stop",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 57017,
                    "track": 2200,
                    "sc_name": "5820B",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 56452,
                        "to": 56685,
                        "yFrom": 46,
                        "yTo": 46,
                        "electrification": "none"
                    },
                    {
                        "from": 56685,
                        "to": 56729,
                        "yFrom": 46,
                        "yTo": 47,
                        "electrification": "none"
                    },
                    {
                        "from": 56729,
                        "to": 56973,
                        "yFrom": 47,
                        "yTo": 47,
                        "electrification": "none"
                    },
                    {
                        "from": 56973,
                        "to": 57017,
                        "yFrom": 47,
                        "yTo": null,
                        "electrification": "none"
                    }
                ]
            },
            {
                "tid": 2903,
                "altRoute": null,
                "fromConnection": {
                    "type": "buffer_stop",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 56729,
                    "track": 2901,
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 56453,
                        "to": 56685,
                        "yFrom": 45,
                        "yTo": 45,
                        "electrification": "none"
                    },
                    {
                        "from": 56685,
                        "to": 56729,
                        "yFrom": 45,
                        "yTo": null,
                        "electrification": "none"
                    }
                ]
            },
            {
                "toConnection": null,
                "tid": 2100,
                "altRoute": {
                    "elr": "DCF",
                    "showAltRuler": false
                },
                "fromConnection": {
                    "type": "junction",
                    "at": 57482,
                    "track": 2200,
                    "sc_name": "5822",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 57482,
                        "to": 57526,
                        "yFrom": null,
                        "yTo": 47,
                        "electrification": "overhead"
                    },
                    {
                        "from": 57526,
                        "to": 58126,
                        "yFrom": 47,
                        "yTo": 47,
                        "electrification": "overhead"
                    },
                    {
                        "from": 58126,
                        "to": 58190,
                        "yFrom": 47,
                        "yTo": 53,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 3700,
                "altRoute": null,
                "fromConnection": {
                    "type": "junction",
                    "at": 58963,
                    "track": 1100,
                    "sc_name": "5824A",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 59108,
                    "track": 1200,
                    "sc_name": "5824B",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 58963,
                        "to": 59108,
                        "yFrom": null,
                        "yTo": null,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 2900,
                "altRoute": null,
                "fromConnection": {
                    "type": "buffer_stop",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 72238,
                    "track": 2200,
                    "sc_name": "2286",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 71325,
                        "to": 72194,
                        "yFrom": 47,
                        "yTo": 47,
                        "electrification": "none"
                    },
                    {
                        "from": 72194,
                        "to": 72238,
                        "yFrom": 47,
                        "yTo": null,
                        "electrification": "none"
                    }
                ]
            },
            {
                "tid": 3700,
                "altRoute": null,
                "fromConnection": {
                    "type": "junction",
                    "at": 71335,
                    "track": 1200,
                    "sc_name": "2282A",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 71459,
                    "track": 1100,
                    "sc_name": "2282B",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 71335,
                        "to": 71459,
                        "yFrom": null,
                        "yTo": null,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 3700,
                "altRoute": null,
                "fromConnection": {
                    "type": "junction",
                    "at": 71479,
                    "track": 1100,
                    "sc_name": "2283A",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 71545,
                    "track": 2100,
                    "sc_name": "2283B",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 71479,
                        "to": 71545,
                        "yFrom": null,
                        "yTo": null,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 3701,
                "altRoute": null,
                "fromConnection": {
                    "type": "junction",
                    "at": 71563,
                    "track": 2100,
                    "sc_name": "2284A",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 71807,
                    "track": 2200,
                    "sc_name": "2284B",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 71563,
                        "to": 71807,
                        "yFrom": null,
                        "yTo": null,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "altRoute": null,
                "tid": 3700,
                "fromConnection": {
                    "type": "junction",
                    "at": 71806,
                    "track": 2900,
                    "sc_name": "2285A",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 71870,
                    "track": 2200,
                    "sc_name": "2285B",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 71806,
                        "to": 71870,
                        "yFrom": null,
                        "yTo": null,
                        "electrification": "none"
                    }
                ]
            },
            {
                "altRoute": null,
                "tid": 3701,
                "fromConnection": {
                    "type": "junction",
                    "at": 76946,
                    "track": 1100,
                    "sc_name": "1102A",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 76946,
                        "to": 77012,
                        "yFrom": null,
                        "yTo": null,
                        "electrification": "overhead"
                    }
                ],
                "toConnection": {
                    "type": "junction",
                    "at": 77012,
                    "track": 2100,
                    "sc_name": "1102B",
                    "connectionLink": null
                }
            },
            {
                "tid": 3700,
                "altRoute": null,
                "fromConnection": {
                    "type": "junction",
                    "at": 76992,
                    "track": 1100,
                    "sc_name": "1100A",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 77127,
                    "track": 1200,
                    "sc_name": "1100B",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 76992,
                        "to": 77127,
                        "yFrom": null,
                        "yTo": null,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 3702,
                "altRoute": null,
                "fromConnection": {
                    "type": "junction",
                    "at": 77026,
                    "track": 2100,
                    "sc_name": "1101A",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 77161,
                    "track": 2200,
                    "sc_name": "1101B",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 77026,
                        "to": 77161,
                        "yFrom": null,
                        "yTo": null,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "altRoute": null,
                "tid": 1900,
                "fromConnection": {
                    "type": "junction",
                    "at": 77141,
                    "track": 1200,
                    "sc_name": "1103A",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "buffer_stop",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 77141,
                        "to": 77185,
                        "yFrom": null,
                        "yTo": 52,
                        "electrification": "none"
                    },
                    {
                        "from": 77185,
                        "to": 77519,
                        "yFrom": 52,
                        "yTo": 52,
                        "electrification": "none"
                    }
                ]
            },
            {
                "tid": 3701,
                "altRoute": null,
                "fromConnection": {
                    "type": "junction",
                    "at": 78812,
                    "track": 2200,
                    "sc_name": "1107A",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 78942,
                    "track": 2100,
                    "sc_name": "1107B",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 78812,
                        "to": 78942,
                        "yFrom": null,
                        "yTo": null,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 3700,
                "altRoute": null,
                "fromConnection": {
                    "type": "junction",
                    "at": 78812,
                    "track": 1200,
                    "sc_name": "1108A",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 78942,
                    "track": 1100,
                    "sc_name": "1108B",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 78812,
                        "to": 78942,
                        "yFrom": null,
                        "yTo": null,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 3700,
                "altRoute": null,
                "fromConnection": {
                    "type": "junction",
                    "at": 90295,
                    "track": 2200,
                    "sc_name": "1122A",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 90431,
                    "track": 2100,
                    "sc_name": "1122B",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 90295,
                        "to": 90431,
                        "yFrom": null,
                        "yTo": null,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 3700,
                "altRoute": null,
                "fromConnection": {
                    "type": "junction",
                    "at": 90544,
                    "track": 2100,
                    "sc_name": "1123A",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 90610,
                    "track": 1100,
                    "sc_name": "1123B",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 90544,
                        "to": 90610,
                        "yFrom": null,
                        "yTo": null,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 3701,
                "altRoute": null,
                "fromConnection": {
                    "type": "junction",
                    "at": 90590,
                    "track": 2100,
                    "sc_name": "1124A",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 90726,
                    "track": 2200,
                    "sc_name": "1124B",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 90590,
                        "to": 90726,
                        "yFrom": null,
                        "yTo": null,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 3700,
                "altRoute": null,
                "fromConnection": {
                    "type": "junction",
                    "at": 90635,
                    "track": 1100,
                    "sc_name": "1125A",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 90806,
                    "track": 1200,
                    "sc_name": "1125B",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 90635,
                        "to": 90806,
                        "yFrom": null,
                        "yTo": null,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 2900,
                "altRoute": null,
                "fromConnection": {
                    "type": "buffer_stop",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 90908,
                    "track": 2200,
                    "sc_name": "1126B",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 90572,
                        "to": 90864,
                        "yFrom": 47,
                        "yTo": 47,
                        "electrification": "none"
                    },
                    {
                        "from": 90864,
                        "to": 90908,
                        "yFrom": 47,
                        "yTo": null,
                        "electrification": "none"
                    }
                ]
            },
            {
                "tid": 1900,
                "altRoute": null,
                "fromConnection": {
                    "type": "junction",
                    "at": 90819,
                    "track": 1200,
                    "sc_name": "1127A",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "buffer_stop",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 90819,
                        "to": 90863,
                        "yFrom": null,
                        "yTo": 52,
                        "electrification": "none"
                    },
                    {
                        "from": 90863,
                        "to": 91339,
                        "yFrom": 52,
                        "yTo": 52,
                        "electrification": "none"
                    }
                ]
            },
            {
                "tid": 3700,
                "altRoute": null,
                "fromConnection": {
                    "type": "junction",
                    "at": 91968,
                    "track": 1200,
                    "sc_name": "1129A",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 92104,
                    "track": 1100,
                    "sc_name": "1129B",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 91968,
                        "to": 92104,
                        "yFrom": null,
                        "yTo": null,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 3700,
                "altRoute": null,
                "fromConnection": {
                    "type": "junction",
                    "at": 102803,
                    "track": 2100,
                    "sc_name": "1140A",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 102913,
                    "track": 2200,
                    "sc_name": "1140B",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 102803,
                        "to": 102913,
                        "yFrom": null,
                        "yTo": null,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 3701,
                "altRoute": null,
                "fromConnection": {
                    "type": "junction",
                    "at": 102848,
                    "track": 1100,
                    "sc_name": "1141A",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 102957,
                    "track": 1200,
                    "sc_name": "1141B",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 102848,
                        "to": 102957,
                        "yFrom": null,
                        "yTo": null,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 1201,
                "altRoute": null,
                "fromConnection": {
                    "type": "junction",
                    "at": 103299,
                    "track": 1200,
                    "sc_name": "1142A",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "buffer_stop",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 103299,
                        "to": 103343,
                        "yFrom": null,
                        "yTo": 52,
                        "electrification": "overhead"
                    },
                    {
                        "from": 103343,
                        "to": 103538,
                        "yFrom": 52,
                        "yTo": 52,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 3902,
                "altRoute": null,
                "fromConnection": {
                    "type": "buffer_stop",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 104069,
                    "track": 2200,
                    "sc_name": "1144B",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 103821,
                        "to": 103937,
                        "yFrom": 46,
                        "yTo": 46,
                        "electrification": "none"
                    },
                    {
                        "from": 103937,
                        "to": 103981,
                        "yFrom": 46,
                        "yTo": 47,
                        "electrification": "none"
                    },
                    {
                        "from": 103981,
                        "to": 104025,
                        "yFrom": 47,
                        "yTo": 47,
                        "electrification": "none"
                    },
                    {
                        "from": 104025,
                        "to": 104069,
                        "yFrom": 47,
                        "yTo": null,
                        "electrification": "none"
                    }
                ]
            },
            {
                "tid": 3901,
                "altRoute": null,
                "fromConnection": {
                    "type": "buffer_stop",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 103981,
                    "track": 3902,
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 103836,
                        "to": 103981,
                        "yFrom": 47,
                        "yTo": 47,
                        "electrification": "none"
                    }
                ]
            },
            {
                "tid": 3700,
                "altRoute": null,
                "fromConnection": {
                    "type": "junction",
                    "at": 104125,
                    "track": 2200,
                    "sc_name": "1145A",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 104262,
                    "track": 2100,
                    "sc_name": "1145B",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 104125,
                        "to": 104262,
                        "yFrom": null,
                        "yTo": null,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 3700,
                "altRoute": null,
                "fromConnection": {
                    "type": "junction",
                    "at": 104285,
                    "track": 1100,
                    "sc_name": "1148A",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 104352,
                    "track": 2100,
                    "sc_name": "1148B",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 104285,
                        "to": 104352,
                        "yFrom": null,
                        "yTo": null,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 3700,
                "altRoute": null,
                "fromConnection": {
                    "type": "junction",
                    "at": 118030,
                    "track": 2100,
                    "sc_name": "1159A",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 118138,
                    "track": 1100,
                    "sc_name": "1159B",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 118030,
                        "to": 118138,
                        "yFrom": null,
                        "yTo": null,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 3700,
                "altRoute": null,
                "fromConnection": {
                    "type": "junction",
                    "at": 118382,
                    "track": 1100,
                    "sc_name": "1162A",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 118490,
                    "track": 2100,
                    "sc_name": "1162B",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 118382,
                        "to": 118490,
                        "yFrom": null,
                        "yTo": null,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 3700,
                "altRoute": null,
                "fromConnection": {
                    "type": "junction",
                    "at": 118607,
                    "track": 2100,
                    "sc_name": "1163A",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 118747,
                    "track": 2200,
                    "sc_name": "1163B",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 118607,
                        "to": 118747,
                        "yFrom": null,
                        "yTo": null,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "altRoute": null,
                "tid": 3300,
                "fromConnection": {
                    "type": "junction",
                    "at": 184961,
                    "track": 3200,
                    "sc_name": "2106A",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 185790,
                    "track": 3200,
                    "sc_name": "2112B",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 184961,
                        "to": 185005,
                        "yFrom": null,
                        "yTo": 46,
                        "electrification": "overhead"
                    },
                    {
                        "from": 185005,
                        "to": 185746,
                        "yFrom": 46,
                        "yTo": 46,
                        "electrification": "overhead"
                    },
                    {
                        "from": 185746,
                        "to": 185790,
                        "yFrom": 46,
                        "yTo": null,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 3700,
                "altRoute": null,
                "fromConnection": {
                    "type": "junction",
                    "at": 187362,
                    "track": 2100,
                    "sc_name": "2119A",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 187428,
                    "track": 1100,
                    "sc_name": "2119B",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 187362,
                        "to": 187428,
                        "yFrom": null,
                        "yTo": null,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "toConnection": null,
                "tid": 2100,
                "altRoute": {
                    "elr": "NOG1",
                    "showAltRuler": false
                },
                "fromConnection": {
                    "type": "junction",
                    "at": 186839,
                    "track": 1100,
                    "sc_name": "2115",
                    "elr": "NOG1",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 186839,
                        "to": 186883,
                        "yFrom": null,
                        "yTo": 46,
                        "electrification": "none"
                    },
                    {
                        "from": 186883,
                        "to": 187154,
                        "yFrom": 46,
                        "yTo": 46,
                        "electrification": "none"
                    }
                ]
            },
            {
                "tid": 3700,
                "altRoute": null,
                "fromConnection": {
                    "type": "junction",
                    "at": 231559,
                    "track": 1100,
                    "sc_name": "2221-2A",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 231664,
                    "track": 2100,
                    "sc_name": "2221-2B",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 231559,
                        "to": 231664,
                        "yFrom": null,
                        "yTo": null,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 3700,
                "altRoute": null,
                "fromConnection": {
                    "type": "junction",
                    "at": 231679,
                    "track": 2100,
                    "sc_name": "2221-3A",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 231785,
                    "track": 1100,
                    "sc_name": "2221-3B",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 231679,
                        "to": 231785,
                        "yFrom": null,
                        "yTo": null,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 3700,
                "altRoute": null,
                "fromConnection": {
                    "type": "junction",
                    "at": 243225,
                    "track": 1100,
                    "sc_name": "2241A",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 243332,
                    "track": 2100,
                    "sc_name": "2241B",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 243225,
                        "to": 243332,
                        "yFrom": null,
                        "yTo": null,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "altRoute": null,
                "tid": 2200,
                "fromConnection": {
                    "type": "junction",
                    "at": 243385,
                    "track": 2100,
                    "sc_name": "2243",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 245652,
                    "track": 2100,
                    "sc_name": "2257",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 243385,
                        "to": 243429,
                        "yFrom": null,
                        "yTo": 48,
                        "electrification": "overhead"
                    },
                    {
                        "from": 243429,
                        "to": 245608,
                        "yFrom": 48,
                        "yTo": 48,
                        "electrification": "overhead"
                    },
                    {
                        "from": 245608,
                        "to": 245652,
                        "yFrom": 48,
                        "yTo": null,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 1500,
                "altRoute": null,
                "fromConnection": {
                    "type": "junction",
                    "at": 243385,
                    "track": 1100,
                    "sc_name": "2242",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 244799,
                    "track": 1100,
                    "sc_name": "2249",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 243385,
                        "to": 243429,
                        "yFrom": null,
                        "yTo": 51,
                        "electrification": "overhead"
                    },
                    {
                        "from": 243429,
                        "to": 244755,
                        "yFrom": 51,
                        "yTo": 51,
                        "electrification": "overhead"
                    },
                    {
                        "from": 244755,
                        "to": 244799,
                        "yFrom": 51,
                        "yTo": null,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 3700,
                "altRoute": null,
                "fromConnection": {
                    "type": "junction",
                    "at": 244236,
                    "track": 2200,
                    "sc_name": "2248A",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 244384,
                    "track": 2100,
                    "sc_name": "2248B",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 244236,
                        "to": 244384,
                        "yFrom": null,
                        "yTo": null,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 2900,
                "altRoute": null,
                "fromConnection": {
                    "type": "buffer_stop",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 244090,
                    "track": 2200,
                    "sc_name": "2245B",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 243864,
                        "to": 244046,
                        "yFrom": 47,
                        "yTo": 47,
                        "electrification": "none"
                    },
                    {
                        "from": 244046,
                        "to": 244090,
                        "yFrom": 47,
                        "yTo": null,
                        "electrification": "none"
                    }
                ]
            },
            {
                "tid": 1100,
                "altRoute": {
                    "elr": "WHR",
                    "showAltRuler": false
                },
                "fromConnection": {
                    "type": "junction",
                    "at": 244097,
                    "track": 2200,
                    "sc_name": "2246",
                    "connectionLink": null
                },
                "toConnection": null,
                "shape": [
                    {
                        "from": 244097,
                        "to": 244200,
                        "yFrom": null,
                        "yTo": 46,
                        "electrification": "none"
                    }
                ]
            },
            {
                "tid": 1900,
                "altRoute": null,
                "fromConnection": {
                    "type": "junction",
                    "at": 244078,
                    "track": 1500,
                    "sc_name": "2247A",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "buffer_stop",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 244078,
                        "to": 244132,
                        "yFrom": null,
                        "yTo": 52,
                        "electrification": "overhead"
                    },
                    {
                        "from": 244132,
                        "to": 244553,
                        "yFrom": 52,
                        "yTo": 52,
                        "electrification": "none"
                    }
                ]
            },
            {
                "altRoute": null,
                "tid": 1901,
                "fromConnection": {
                    "type": "junction",
                    "at": 244329,
                    "track": 1900,
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "buffer_stop",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 244329,
                        "to": 244373,
                        "yFrom": null,
                        "yTo": 53,
                        "electrification": "none"
                    },
                    {
                        "from": 244373,
                        "to": 244591,
                        "yFrom": 53,
                        "yTo": 53,
                        "electrification": "none"
                    }
                ]
            },
            {
                "altRoute": null,
                "tid": 1902,
                "fromConnection": {
                    "type": "junction",
                    "at": 244205,
                    "track": 1900,
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "buffer_stop",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 244205,
                        "to": 244249,
                        "yFrom": null,
                        "yTo": 53,
                        "electrification": "none"
                    },
                    {
                        "from": 244249,
                        "to": 244329,
                        "yFrom": 53,
                        "yTo": 53,
                        "electrification": "none"
                    }
                ]
            },
            {
                "tid": 3700,
                "altRoute": null,
                "fromConnection": {
                    "type": "junction",
                    "at": 246087,
                    "track": 2100,
                    "sc_name": "2258A",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 246194,
                    "track": 1100,
                    "sc_name": "2258B",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 246087,
                        "to": 246194,
                        "yFrom": null,
                        "yTo": null,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 2500,
                "altRoute": null,
                "fromConnection": {
                    "type": "junction",
                    "at": 252077,
                    "track": 2100,
                    "sc_name": "2265",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 253260,
                    "track": 2100,
                    "sc_name": "2267",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 252077,
                        "to": 252131,
                        "yFrom": null,
                        "yTo": 48,
                        "electrification": "overhead"
                    },
                    {
                        "from": 252131,
                        "to": 253216,
                        "yFrom": 48,
                        "yTo": 48,
                        "electrification": "overhead"
                    },
                    {
                        "from": 253216,
                        "to": 253260,
                        "yFrom": 48,
                        "yTo": null,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 1500,
                "altRoute": null,
                "fromConnection": {
                    "type": "junction",
                    "at": 252079,
                    "track": 1100,
                    "sc_name": "2264",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 253260,
                    "track": 1100,
                    "sc_name": "2266",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 252079,
                        "to": 252131,
                        "yFrom": null,
                        "yTo": 51,
                        "electrification": "overhead"
                    },
                    {
                        "from": 252131,
                        "to": 253216,
                        "yFrom": 51,
                        "yTo": 51,
                        "electrification": "overhead"
                    },
                    {
                        "from": 253216,
                        "to": 253260,
                        "yFrom": 51,
                        "yTo": null,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 3700,
                "altRoute": null,
                "fromConnection": {
                    "type": "junction",
                    "at": 253498,
                    "track": 1100,
                    "sc_name": "2269-2A",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 253605,
                    "track": 2100,
                    "sc_name": "2269-2B",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 253498,
                        "to": 253605,
                        "yFrom": null,
                        "yTo": null,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "altRoute": null,
                "tid": 3700,
                "fromConnection": {
                    "type": "junction",
                    "at": 253675,
                    "track": 2100,
                    "sc_name": "2269-3A",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 253783,
                    "track": 1100,
                    "sc_name": "2269-3B",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 253675,
                        "to": 253783,
                        "yFrom": null,
                        "yTo": null,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 3700,
                "altRoute": null,
                "fromConnection": {
                    "type": "junction",
                    "at": 261619,
                    "track": 1100,
                    "sc_name": "2271-2A",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 261728,
                    "track": 2100,
                    "sc_name": "2271-2B",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 261619,
                        "to": 261728,
                        "yFrom": null,
                        "yTo": null,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 3700,
                "altRoute": null,
                "fromConnection": {
                    "type": "junction",
                    "at": 261746,
                    "track": 2100,
                    "sc_name": "2271-3A",
                    "connectionLink": null
                },
                "toConnection": {
                    "type": "junction",
                    "at": 261853,
                    "track": 1100,
                    "sc_name": "2271-3B",
                    "connectionLink": null
                },
                "shape": [
                    {
                        "from": 261746,
                        "to": 261853,
                        "yFrom": null,
                        "yTo": null,
                        "electrification": "overhead"
                    }
                ]
            }
        ],
        "stations": [
            {
                "sideDiagramVisible": true,
                "name": "Kings Cross",
                "at": 220,
                "platforms": [
                    {
                        "track": 3600,
                        "platformNo": 0,
                        "from": 0,
                        "to": 330,
                        "position": "above"
                    },
                    {
                        "track": 3601,
                        "platformNo": 1,
                        "from": 0,
                        "to": 330,
                        "position": "below"
                    },
                    {
                        "track": 3602,
                        "platformNo": 2,
                        "from": 0,
                        "to": 308,
                        "position": "above"
                    },
                    {
                        "track": 3603,
                        "platformNo": 3,
                        "from": 0,
                        "to": 308,
                        "position": "below"
                    },
                    {
                        "track": 3604,
                        "platformNo": 4,
                        "from": 0,
                        "to": 286,
                        "position": "above"
                    },
                    {
                        "track": 3605,
                        "platformNo": 5,
                        "from": 0,
                        "to": 286,
                        "position": "below"
                    },
                    {
                        "track": 3606,
                        "platformNo": 6,
                        "from": 0,
                        "to": 308,
                        "position": "above"
                    },
                    {
                        "track": 3607,
                        "platformNo": 7,
                        "from": 0,
                        "to": 308,
                        "position": "below"
                    },
                    {
                        "track": 3608,
                        "platformNo": 8,
                        "from": 0,
                        "to": 308,
                        "position": "above"
                    },
                    {
                        "track": 3609,
                        "platformNo": 9,
                        "from": 154,
                        "to": 308,
                        "position": "below"
                    },
                    {
                        "track": 3610,
                        "platformNo": 10,
                        "from": 154,
                        "to": 308,
                        "position": "below"
                    }
                ]
            },
            {
                "name": "Finsbury Park",
                "at": 4444,
                "platforms": [
                    {
                        "track": 1202,
                        "platformNo": 1,
                        "from": 4356,
                        "to": 4598,
                        "position": "above"
                    },
                    {
                        "track": 1200,
                        "platformNo": 2,
                        "from": 4334,
                        "to": 4598,
                        "position": "below"
                    },
                    {
                        "track": 1200,
                        "platformNo": 3,
                        "from": 4334,
                        "to": 4642,
                        "position": "above"
                    },
                    {
                        "track": 1100,
                        "platformNo": 4,
                        "from": 4334,
                        "to": 4598,
                        "position": "below"
                    },
                    {
                        "track": 2100,
                        "platformNo": 5,
                        "from": 4334,
                        "to": 4598,
                        "position": "above"
                    },
                    {
                        "track": 2200,
                        "platformNo": 6,
                        "from": 4312,
                        "to": 4510,
                        "position": "below"
                    },
                    {
                        "track": 2200,
                        "platformNo": 7,
                        "from": 4312,
                        "to": 4598,
                        "position": "above"
                    },
                    {
                        "track": 2101,
                        "platformNo": 8,
                        "from": 4312,
                        "to": 4510,
                        "position": "below"
                    }
                ],
                "sideDiagramVisible": false
            },
            {
                "name": "Harringay",
                "at": 5984,
                "platforms": [
                    {
                        "track": 1200,
                        "platformNo": 1,
                        "from": 5918,
                        "to": 6072,
                        "position": "below"
                    },
                    {
                        "track": 2200,
                        "platformNo": 2,
                        "from": 5918,
                        "to": 6072,
                        "position": "below"
                    }
                ],
                "sideDiagramVisible": false
            },
            {
                "name": "Hornsey",
                "at": 7128,
                "platforms": [
                    {
                        "track": 1200,
                        "platformNo": 1,
                        "from": 7070,
                        "to": 7194,
                        "position": "above"
                    },
                    {
                        "track": 2200,
                        "platformNo": 2,
                        "from": 7040,
                        "to": 7194,
                        "position": "above"
                    }
                ],
                "sideDiagramVisible": false
            },
            {
                "name": "Alexandra Palace",
                "at": 8778,
                "platforms": [
                    {
                        "track": 1202,
                        "platformNo": 1,
                        "from": 8690,
                        "to": 8844,
                        "position": "below"
                    },
                    {
                        "track": 1200,
                        "platformNo": 2,
                        "from": 8690,
                        "to": 8844,
                        "position": "above"
                    },
                    {
                        "track": 2200,
                        "platformNo": 3,
                        "from": 8646,
                        "to": 8844,
                        "position": "above"
                    },
                    {
                        "track": 2100,
                        "platformNo": 4,
                        "from": 8646,
                        "to": 8844,
                        "position": "below",
                        "elr": "HDB"
                    }
                ],
                "sideDiagramVisible": false
            },
            {
                "name": "New Southgate",
                "at": 11330,
                "platforms": [
                    {
                        "track": 1200,
                        "platformNo": 1,
                        "from": 11242,
                        "to": 11440,
                        "position": "above"
                    },
                    {
                        "track": 1100,
                        "platformNo": 2,
                        "from": 11242,
                        "to": 11440,
                        "position": "below"
                    },
                    {
                        "track": 2100,
                        "platformNo": 3,
                        "from": 11242,
                        "to": 11440,
                        "position": "above"
                    },
                    {
                        "track": 2200,
                        "platformNo": 4,
                        "from": 11242,
                        "to": 11440,
                        "position": "below"
                    }
                ],
                "sideDiagramVisible": false
            },
            {
                "name": "Oakleigh Park",
                "at": 14740,
                "platforms": [
                    {
                        "track": 1200,
                        "platformNo": 1,
                        "from": 14652,
                        "to": 14828,
                        "position": "above"
                    },
                    {
                        "track": 1100,
                        "platformNo": 2,
                        "from": 14652,
                        "to": 14828,
                        "position": "below"
                    },
                    {
                        "track": 2100,
                        "platformNo": 3,
                        "from": 14652,
                        "to": 14828,
                        "position": "above"
                    },
                    {
                        "track": 2200,
                        "platformNo": 4,
                        "from": 14652,
                        "to": 14828,
                        "position": "below"
                    }
                ],
                "sideDiagramVisible": false
            },
            {
                "name": "New Barnet",
                "at": 16104,
                "platforms": [
                    {
                        "track": 1200,
                        "platformNo": 1,
                        "from": 16016,
                        "to": 16214,
                        "position": "above"
                    },
                    {
                        "track": 1100,
                        "platformNo": 2,
                        "from": 16016,
                        "to": 16214,
                        "position": "below"
                    },
                    {
                        "track": 2100,
                        "platformNo": 3,
                        "from": 16016,
                        "to": 16214,
                        "position": "above"
                    },
                    {
                        "track": 2200,
                        "platformNo": 4,
                        "from": 16016,
                        "to": 16192,
                        "position": "below"
                    }
                ],
                "sideDiagramVisible": false
            },
            {
                "name": "Hadley Wood",
                "at": 18632,
                "platforms": [
                    {
                        "track": 1200,
                        "platformNo": 1,
                        "from": 18524,
                        "to": 18744,
                        "position": "below"
                    },
                    {
                        "track": 1100,
                        "platformNo": 2,
                        "from": 18524,
                        "to": 18744,
                        "position": "above"
                    },
                    {
                        "track": 2100,
                        "platformNo": 3,
                        "from": 18524,
                        "to": 18744,
                        "position": "below"
                    },
                    {
                        "track": 2200,
                        "platformNo": 4,
                        "from": 18546,
                        "to": 18766,
                        "position": "above"
                    }
                ],
                "sideDiagramVisible": false
            },
            {
                "sideDiagramVisible": true,
                "name": "Potters Bar",
                "at": 22440,
                "platforms": [
                    {
                        "track": 1200,
                        "platformNo": 1,
                        "from": 22352,
                        "to": 22550,
                        "position": "above"
                    },
                    {
                        "track": 1100,
                        "platformNo": 2,
                        "from": 22352,
                        "to": 22550,
                        "position": "below"
                    },
                    {
                        "track": 2100,
                        "platformNo": 3,
                        "from": 22352,
                        "to": 22550,
                        "position": "above"
                    },
                    {
                        "track": 2200,
                        "platformNo": 4,
                        "from": 22352,
                        "to": 22550,
                        "position": "below"
                    }
                ]
            },
            {
                "name": "Brookmans Park",
                "at": 25476,
                "platforms": [
                    {
                        "track": 1200,
                        "platformNo": 1,
                        "from": 25410,
                        "to": 25542,
                        "position": "above"
                    },
                    {
                        "track": 1100,
                        "platformNo": 2,
                        "from": 25410,
                        "to": 25542,
                        "position": "below"
                    },
                    {
                        "track": 2100,
                        "platformNo": 3,
                        "from": 25410,
                        "to": 25542,
                        "position": "above"
                    },
                    {
                        "track": 2200,
                        "platformNo": 4,
                        "from": 25410,
                        "to": 25542,
                        "position": "below"
                    }
                ],
                "sideDiagramVisible": false
            },
            {
                "name": "Welham Green",
                "at": 27368,
                "platforms": [
                    {
                        "track": 1200,
                        "platformNo": 1,
                        "from": 27302,
                        "to": 27456,
                        "position": "below"
                    },
                    {
                        "track": 2200,
                        "platformNo": 2,
                        "from": 27302,
                        "to": 27456,
                        "position": "above"
                    }
                ],
                "sideDiagramVisible": false
            },
            {
                "name": "Hatfield Station",
                "at": 31152,
                "platforms": [
                    {
                        "track": 1200,
                        "platformNo": 1,
                        "from": 30976,
                        "to": 31152,
                        "position": "below"
                    },
                    {
                        "track": 2100,
                        "platformNo": 2,
                        "from": 31174,
                        "to": 31350,
                        "position": "above"
                    },
                    {
                        "track": 2200,
                        "platformNo": 3,
                        "from": 31174,
                        "to": 31350,
                        "position": "below"
                    }
                ],
                "sideDiagramVisible": false
            },
            {
                "name": "Welwyn Garden City",
                "at": 35772,
                "platforms": [
                    {
                        "track": 1500,
                        "platformNo": 1,
                        "from": 35662,
                        "to": 35860,
                        "position": "above"
                    },
                    {
                        "track": 1200,
                        "platformNo": 2,
                        "from": 35662,
                        "to": 35860,
                        "position": "below"
                    },
                    {
                        "track": 2200,
                        "platformNo": 3,
                        "from": 35662,
                        "to": 35860,
                        "position": "above"
                    },
                    {
                        "track": 2500,
                        "platformNo": 4,
                        "from": 35662,
                        "to": 35860,
                        "position": "below"
                    }
                ],
                "sideDiagramVisible": false
            },
            {
                "name": "Welham North",
                "at": 38764,
                "platforms": [
                    {
                        "track": 1100,
                        "platformNo": 1,
                        "from": 38654,
                        "to": 38830,
                        "position": "below"
                    },
                    {
                        "track": 2100,
                        "platformNo": 2,
                        "from": 38654,
                        "to": 38830,
                        "position": "above"
                    }
                ],
                "sideDiagramVisible": false
            },
            {
                "name": "Knebworth",
                "at": 44088,
                "platforms": [
                    {
                        "track": 1200,
                        "platformNo": 1,
                        "from": 44022,
                        "to": 44198,
                        "position": "above"
                    },
                    {
                        "track": 1100,
                        "platformNo": 2,
                        "from": 44022,
                        "to": 44198,
                        "position": "below"
                    },
                    {
                        "track": 2100,
                        "platformNo": 3,
                        "from": 44022,
                        "to": 44198,
                        "position": "above"
                    },
                    {
                        "track": 2200,
                        "platformNo": 4,
                        "from": 44022,
                        "to": 44198,
                        "position": "below"
                    }
                ],
                "sideDiagramVisible": false
            },
            {
                "name": "Stevenage",
                "at": 48576,
                "platforms": [
                    {
                        "track": 1200,
                        "platformNo": 1,
                        "from": 48432,
                        "to": 48686,
                        "position": "above"
                    },
                    {
                        "track": 1100,
                        "platformNo": 2,
                        "from": 48432,
                        "to": 48686,
                        "position": "below"
                    },
                    {
                        "track": 2100,
                        "platformNo": 3,
                        "from": 48432,
                        "to": 48686,
                        "position": "above"
                    },
                    {
                        "track": 2200,
                        "platformNo": 4,
                        "from": 48432,
                        "to": 48686,
                        "position": "below"
                    },
                    {
                        "track": 3605,
                        "platformNo": 5,
                        "from": 48433,
                        "to": 48565,
                        "position": "above",
                        "elr": "HDB"
                    }
                ],
                "sideDiagramVisible": true
            },
            {
                "name": "Hitchin",
                "at": 56144,
                "platforms": [
                    {
                        "track": 1200,
                        "platformNo": 1,
                        "from": 56012,
                        "to": 56254,
                        "position": "below"
                    },
                    {
                        "track": 2200,
                        "platformNo": 2,
                        "from": 56012,
                        "to": 56254,
                        "position": "above"
                    }
                ],
                "sideDiagramVisible": false
            },
            {
                "name": "Arlesey",
                "at": 65252,
                "platforms": [
                    {
                        "track": 1200,
                        "platformNo": 1,
                        "from": 65095,
                        "to": 65384,
                        "position": "below"
                    },
                    {
                        "track": 2200,
                        "platformNo": 2,
                        "from": 65098,
                        "to": 65384,
                        "position": "above"
                    }
                ],
                "sideDiagramVisible": false
            },
            {
                "name": "Biggleswade",
                "at": 72380,
                "platforms": [
                    {
                        "track": 1200,
                        "platformNo": 1,
                        "from": 72314,
                        "to": 72578,
                        "position": "above"
                    },
                    {
                        "track": 1100,
                        "platformNo": 2,
                        "from": 72270,
                        "to": 72534,
                        "position": "below"
                    },
                    {
                        "track": 2100,
                        "platformNo": 3,
                        "from": 72270,
                        "to": 72534,
                        "position": "above"
                    },
                    {
                        "track": 2200,
                        "platformNo": 4,
                        "from": 72248,
                        "to": 72512,
                        "position": "below"
                    }
                ],
                "sideDiagramVisible": false
            },
            {
                "sideDiagramVisible": true,
                "name": "Sandy",
                "at": 77638,
                "platforms": [
                    {
                        "track": 1200,
                        "platformNo": 1,
                        "from": 77462,
                        "to": 77726,
                        "position": "below"
                    },
                    {
                        "track": 2200,
                        "platformNo": 2,
                        "from": 77506,
                        "to": 77726,
                        "position": "above"
                    }
                ]
            },
            {
                "name": "St Neots",
                "at": 91080,
                "platforms": [
                    {
                        "track": 1200,
                        "platformNo": 1,
                        "from": 90970,
                        "to": 91234,
                        "position": "above"
                    },
                    {
                        "track": 1100,
                        "platformNo": 2,
                        "from": 90970,
                        "to": 91234,
                        "position": "below"
                    },
                    {
                        "track": 2100,
                        "platformNo": 3,
                        "from": 90926,
                        "to": 91190,
                        "position": "above"
                    },
                    {
                        "track": 2200,
                        "platformNo": 4,
                        "from": 90926,
                        "to": 91190,
                        "position": "below"
                    }
                ],
                "sideDiagramVisible": false
            },
            {
                "sideDiagramVisible": true,
                "name": "Huntingdon",
                "at": 103510,
                "platforms": [
                    {
                        "track": 1200,
                        "platformNo": 1,
                        "from": 103378,
                        "to": 103664,
                        "position": "below"
                    },
                    {
                        "track": 2200,
                        "platformNo": 2,
                        "from": 103356,
                        "to": 103642,
                        "position": "above"
                    }
                ]
            },
            {
                "name": "York",
                "at": 331782,
                "platforms": [
                    {
                        "track": 1100,
                        "platformNo": 3,
                        "from": 331518,
                        "to": 331814,
                        "position": "below"
                    },
                    {
                        "track": 3804,
                        "platformNo": 4,
                        "from": 331814,
                        "to": 332068,
                        "position": "below",
                        "elr": "YMS"
                    },
                    {
                        "track": 2100,
                        "platformNo": 5,
                        "from": 331474,
                        "to": 331936,
                        "position": "above"
                    },
                    {
                        "track": 3601,
                        "platformNo": 1,
                        "from": 331518,
                        "to": 331738,
                        "position": "above",
                        "elr": ""
                    },
                    {
                        "track": 3606,
                        "platformNo": 6,
                        "from": 331474,
                        "to": 331749,
                        "position": "below",
                        "elr": ""
                    },
                    {
                        "track": 3607,
                        "platformNo": 7,
                        "from": 331474,
                        "to": 331749,
                        "position": "above",
                        "elr": ""
                    },
                    {
                        "track": 3608,
                        "platformNo": 8,
                        "from": 331804,
                        "to": 331980,
                        "position": "above",
                        "elr": ""
                    },
                    {
                        "track": 3809,
                        "platformNo": 9,
                        "from": 331474,
                        "to": 331980,
                        "position": "below",
                        "elr": ""
                    },
                    {
                        "track": 3810,
                        "platformNo": 10,
                        "from": 331452,
                        "to": 331870,
                        "position": "above",
                        "elr": ""
                    },
                    {
                        "track": 3811,
                        "platformNo": 11,
                        "from": 331452,
                        "to": 331870,
                        "position": "below",
                        "elr": ""
                    },
                    {
                        "track": 3602,
                        "platformNo": 2,
                        "from": 331854,
                        "to": 332068,
                        "position": "above",
                        "elr": "YMS"
                    }
                ],
                "sideDiagramVisible": true
            },
            {
                "name": "Thirsk",
                "at": 370832,
                "platforms": [
                    {
                        "track": 1200,
                        "platformNo": 1,
                        "from": 370744,
                        "to": 370942,
                        "position": "above"
                    },
                    {
                        "track": 2200,
                        "platformNo": 2,
                        "from": 370744,
                        "to": 370936,
                        "position": "below"
                    }
                ],
                "sideDiagramVisible": false
            },
            {
                "sideDiagramVisible": true,
                "name": "Northallerton",
                "at": 384500,
                "platforms": [
                    {
                        "track": 1100,
                        "platformNo": 1,
                        "from": 384274,
                        "to": 384538,
                        "position": "below"
                    },
                    {
                        "track": 2100,
                        "platformNo": 2,
                        "from": 384384,
                        "to": 384670,
                        "position": "above"
                    }
                ]
            },
            {
                "name": "Doncaster",
                "at": 274494,
                "sideDiagramVisible": true,
                "platforms": [
                    {
                        "track": 2200,
                        "platformNo": 4,
                        "from": 274340,
                        "to": 274703,
                        "position": "above",
                        "elr": ""
                    },
                    {
                        "track": 1200,
                        "platformNo": 3,
                        "from": 274263,
                        "to": 274703,
                        "position": "below",
                        "elr": ""
                    },
                    {
                        "track": 3605,
                        "platformNo": 5,
                        "from": 274340,
                        "to": 274450,
                        "position": "below",
                        "elr": ""
                    },
                    {
                        "track": 3606,
                        "platformNo": 6,
                        "from": 274538,
                        "to": 274703,
                        "position": "below",
                        "elr": ""
                    },
                    {
                        "track": 3607,
                        "platformNo": 7,
                        "from": 274538,
                        "to": 274626,
                        "position": "above",
                        "elr": ""
                    },
                    {
                        "track": 2808,
                        "platformNo": 8,
                        "from": 274406,
                        "to": 274626,
                        "position": "below",
                        "elr": ""
                    }
                ]
            },
            {
                "name": "Peterborough",
                "at": 134398,
                "sideDiagramVisible": true,
                "platforms": [
                    {
                        "track": 1200,
                        "platformNo": 1,
                        "from": 134156,
                        "to": 134486,
                        "position": "below",
                        "elr": ""
                    },
                    {
                        "track": 1252,
                        "platformNo": 2,
                        "from": 134244,
                        "to": 134574,
                        "position": "above",
                        "elr": ""
                    },
                    {
                        "track": 1100,
                        "platformNo": 3,
                        "from": 134244,
                        "to": 134574,
                        "position": "below",
                        "elr": ""
                    },
                    {
                        "track": 2202,
                        "platformNo": 4,
                        "from": 134321,
                        "to": 134596,
                        "position": "above",
                        "elr": ""
                    },
                    {
                        "track": 2201,
                        "platformNo": 5,
                        "from": 134321,
                        "to": 134596,
                        "position": "below",
                        "elr": ""
                    },
                    {
                        "track": 1100,
                        "platformNo": 6,
                        "from": 134288,
                        "to": 134508,
                        "position": "above",
                        "elr": "EMP"
                    },
                    {
                        "track": 2100,
                        "platformNo": 7,
                        "from": 134288,
                        "to": 134508,
                        "position": "below",
                        "elr": "EMP"
                    }
                ]
            },
            {
                "name": "Grantham",
                "at": 185636,
                "sideDiagramVisible": true,
                "platforms": [
                    {
                        "track": 1100,
                        "platformNo": 1,
                        "from": 185482,
                        "to": 185790,
                        "position": "below",
                        "elr": ""
                    },
                    {
                        "track": 2100,
                        "platformNo": 2,
                        "from": 185482,
                        "to": 185790,
                        "position": "above",
                        "elr": ""
                    },
                    {
                        "track": 3200,
                        "platformNo": 4,
                        "from": 185416,
                        "to": 185702,
                        "position": "below",
                        "elr": ""
                    },
                    {
                        "track": 3603,
                        "platformNo": 3,
                        "from": 185592,
                        "to": 185702,
                        "position": "above",
                        "elr": ""
                    }
                ]
            },
            {
                "name": "Newark North Gate",
                "at": 211376,
                "sideDiagramVisible": true,
                "platforms": [
                    {
                        "track": 2100,
                        "platformNo": 1,
                        "from": 211288,
                        "to": 211574,
                        "position": "above",
                        "elr": ""
                    },
                    {
                        "track": 1100,
                        "platformNo": 2,
                        "from": 211288,
                        "to": 211574,
                        "position": "below",
                        "elr": ""
                    },
                    {
                        "track": 3500,
                        "platformNo": 3,
                        "from": 211288,
                        "to": 211651,
                        "position": "above",
                        "elr": ""
                    }
                ]
            },
            {
                "name": "Retford",
                "at": 243958,
                "sideDiagramVisible": true,
                "platforms": [
                    {
                        "track": 1500,
                        "platformNo": 1,
                        "from": 243793,
                        "to": 244068,
                        "position": "below",
                        "elr": ""
                    },
                    {
                        "track": 2200,
                        "platformNo": 2,
                        "from": 243815,
                        "to": 244068,
                        "position": "below",
                        "elr": ""
                    }
                ]
            },
            {
                "name": "Darlington",
                "at": 409442,
                "sideDiagramVisible": true,
                "platforms": []
            },
            {
                "name": "Durham",
                "at": 448228,
                "sideDiagramVisible": true,
                "platforms": []
            },
            {
                "name": "Chester-le-Street",
                "at": 458326,
                "sideDiagramVisible": false,
                "platforms": []
            },
            {
                "name": "Newcastle",
                "at": 472930,
                "sideDiagramVisible": true,
                "platforms": []
            },
            {
                "name": "Morpeth",
                "at": 502190,
                "sideDiagramVisible": true,
                "platforms": [
                    {
                        "track": 1100,
                        "platformNo": 1,
                        "from": 502091,
                        "to": 502333,
                        "position": "below",
                        "elr": ""
                    },
                    {
                        "track": 2100,
                        "platformNo": 2,
                        "from": 502091,
                        "to": 502333,
                        "position": "above",
                        "elr": ""
                    }
                ]
            },
            {
                "name": "Alnmouth",
                "at": 534288,
                "sideDiagramVisible": true,
                "platforms": [
                    {
                        "track": 1100,
                        "platformNo": 1,
                        "from": 534266,
                        "to": 534398,
                        "position": "below",
                        "elr": ""
                    },
                    {
                        "track": 2100,
                        "platformNo": 2,
                        "from": 534266,
                        "to": 534398,
                        "position": "above",
                        "elr": ""
                    }
                ]
            },
            {
                "name": "Berwick upon Tweed",
                "at": 590850,
                "sideDiagramVisible": true,
                "platforms": []
            },
            {
                "name": "Chathill",
                "at": 553912,
                "sideDiagramVisible": true,
                "platforms": [
                    {
                        "track": 1100,
                        "platformNo": 1,
                        "from": 553890,
                        "to": 554022,
                        "position": "below",
                        "elr": ""
                    },
                    {
                        "track": 2100,
                        "platformNo": 2,
                        "from": 553890,
                        "to": 554022,
                        "position": "above",
                        "elr": ""
                    }
                ]
            },
            {
                "name": "Acklington",
                "at": 523156,
                "sideDiagramVisible": false,
                "platforms": [
                    {
                        "track": 1100,
                        "platformNo": 1,
                        "from": 523090,
                        "to": 523222,
                        "position": "below",
                        "elr": ""
                    },
                    {
                        "track": 2100,
                        "platformNo": 2,
                        "from": 523090,
                        "to": 523222,
                        "position": "above",
                        "elr": ""
                    }
                ]
            },
            {
                "name": "Widdrington",
                "at": 513828,
                "sideDiagramVisible": false,
                "platforms": [
                    {
                        "track": 1100,
                        "platformNo": 1,
                        "from": 513762,
                        "to": 513894,
                        "position": "below",
                        "elr": ""
                    },
                    {
                        "track": 2100,
                        "platformNo": 2,
                        "from": 513762,
                        "to": 513894,
                        "position": "above",
                        "elr": ""
                    }
                ]
            },
            {
                "name": "Pegswood",
                "at": 505578,
                "sideDiagramVisible": false,
                "platforms": [
                    {
                        "track": 1100,
                        "platformNo": 1,
                        "from": 505545,
                        "to": 505644,
                        "position": "below",
                        "elr": ""
                    },
                    {
                        "track": 2100,
                        "platformNo": 2,
                        "from": 505545,
                        "to": 505644,
                        "position": "above",
                        "elr": ""
                    }
                ]
            },
            {
                "name": "Cramlington",
                "at": 490398,
                "sideDiagramVisible": false,
                "platforms": [
                    {
                        "track": 1100,
                        "platformNo": 1,
                        "from": 490321,
                        "to": 490442,
                        "position": "below",
                        "elr": ""
                    },
                    {
                        "track": 2100,
                        "platformNo": 2,
                        "from": 490321,
                        "to": 490442,
                        "position": "above",
                        "elr": ""
                    }
                ]
            },
            {
                "name": "Manors",
                "at": 473942,
                "sideDiagramVisible": false,
                "platforms": [
                    {
                        "track": 1100,
                        "platformNo": 1,
                        "from": 473821,
                        "to": 474030,
                        "position": "above",
                        "elr": ""
                    },
                    {
                        "track": 2100,
                        "platformNo": 2,
                        "from": 473821,
                        "to": 474030,
                        "position": "below",
                        "elr": ""
                    }
                ]
            }
        ],
        "structures": [
            {
                "name": "Gas Works Tunnel West Bore",
                "type": "tunnel",
                "structureNo": "ECM1-4",
                "trackLocation": [
                    {
                        "from": 484,
                        "to": 1012,
                        "tid": 3106
                    },
                    {
                        "from": 484,
                        "to": 1012,
                        "tid": 3105
                    }
                ]
            },
            {
                "name": "Gas Works Tunnel Center Bore",
                "type": "tunnel",
                "structureNo": "ECM1-4",
                "trackLocation": [
                    {
                        "from": 484,
                        "to": 1012,
                        "tid": 3104
                    },
                    {
                        "from": 484,
                        "to": 1012,
                        "tid": 3103
                    }
                ]
            },
            {
                "name": "Gas Works Tunnel East Bore",
                "type": "tunnel",
                "structureNo": "ECM1-4",
                "trackLocation": [
                    {
                        "from": 484,
                        "to": 1012,
                        "tid": 3102
                    },
                    {
                        "from": 484,
                        "to": 1012,
                        "tid": 3101
                    }
                ]
            },
            {
                "name": "Copenhagen Tunnel West Bore",
                "type": "tunnel",
                "structureNo": "ECM1-6",
                "trackLocation": [
                    {
                        "from": 1430,
                        "to": 2024,
                        "tid": 2200
                    },
                    {
                        "from": 1430,
                        "to": 2024,
                        "tid": 1200
                    }
                ]
            },
            {
                "name": "Copenhagen Tunnel Center Bore",
                "type": "tunnel",
                "structureNo": "ECM1-6",
                "trackLocation": [
                    {
                        "from": 1430,
                        "to": 2024,
                        "tid": 2100
                    },
                    {
                        "from": 1430,
                        "to": 2024,
                        "tid": 1100
                    }
                ]
            },
            {
                "name": "Holloway Flyover",
                "type": "viaduct",
                "structureNo": "ECM1-7",
                "trackLocation": [
                    {
                        "from": 2046,
                        "to": 2244,
                        "tid": 1200
                    }
                ]
            },
            {
                "name": "Intersection Bridge",
                "type": "underbridge",
                "structureNo": "ECM1-12",
                "trackLocation": [
                    {
                        "from": 3630,
                        "to": 3696,
                        "tid": 2200
                    },
                    {
                        "from": 3454,
                        "to": 3520,
                        "tid": 1202
                    }
                ]
            },
            {
                "name": "Intersection Bridge",
                "type": "underbridge",
                "structureNo": "ECM1-12B",
                "trackLocation": [
                    {
                        "from": 3696,
                        "to": 3784,
                        "tid": 1202
                    }
                ]
            },
            {
                "name": "Harringay Flyover",
                "type": "viaduct",
                "structureNo": "ECM1-23",
                "trackLocation": [
                    {
                        "from": 6195,
                        "to": 6402,
                        "tid": 3800
                    }
                ]
            },
            {
                "name": "Intersection Bridge",
                "type": "overbridge",
                "structureNo": "ECM1-31",
                "trackLocation": [
                    {
                        "from": 9240,
                        "to": 9262,
                        "tid": 2200
                    },
                    {
                        "from": 9328,
                        "to": 9350,
                        "tid": 1200
                    }
                ]
            },
            {
                "name": "Wood Green Tunnel West Bore",
                "type": "tunnel",
                "structureNo": "ECM1-31T",
                "trackLocation": [
                    {
                        "from": 9702,
                        "to": 10406,
                        "tid": 2200
                    }
                ]
            },
            {
                "name": "Wood Green Tunnel Center Bore",
                "type": "tunnel",
                "structureNo": "ECM1-31T",
                "trackLocation": [
                    {
                        "from": 9702,
                        "to": 10406,
                        "tid": 2100
                    },
                    {
                        "from": 9702,
                        "to": 10406,
                        "tid": 1100
                    }
                ]
            },
            {
                "name": "Wood Green Tunnel East Bore",
                "type": "tunnel",
                "structureNo": "ECM1-31T",
                "trackLocation": [
                    {
                        "from": 9702,
                        "to": 10406,
                        "tid": 1200
                    }
                ]
            },
            {
                "name": "Barnet Tunnel West Bore",
                "type": "tunnel",
                "structureNo": "ECM1-37TW",
                "trackLocation": [
                    {
                        "from": 13244,
                        "to": 13860,
                        "tid": 2200
                    }
                ]
            },
            {
                "name": "Barnet Tunnel Center Bore",
                "type": "tunnel",
                "structureNo": "ECM1-37TC",
                "trackLocation": [
                    {
                        "from": 13244,
                        "to": 13860,
                        "tid": 2100
                    },
                    {
                        "from": 13244,
                        "to": 13860,
                        "tid": 1100
                    }
                ]
            },
            {
                "name": "Barnet Tunnel East Bore",
                "type": "tunnel",
                "structureNo": "ECM1-37TE",
                "trackLocation": [
                    {
                        "from": 13244,
                        "to": 13860,
                        "tid": 1200
                    }
                ]
            },
            {
                "name": "Hadley South Tunnel West Bore",
                "type": "tunnel",
                "structureNo": "ECM1-45TW",
                "trackLocation": [
                    {
                        "from": 18062,
                        "to": 18458,
                        "tid": 2200
                    },
                    {
                        "from": 18062,
                        "to": 18458,
                        "tid": 2100
                    }
                ]
            },
            {
                "name": "Hadley South Tunnel East Bore",
                "type": "tunnel",
                "structureNo": "ECM1-45TE",
                "trackLocation": [
                    {
                        "from": 18062,
                        "to": 18458,
                        "tid": 1100
                    },
                    {
                        "from": 18062,
                        "to": 18458,
                        "tid": 1200
                    }
                ]
            },
            {
                "name": "Hadley North Tunnel West Bore",
                "type": "tunnel",
                "structureNo": "ECM1-45TB",
                "trackLocation": [
                    {
                        "from": 18920,
                        "to": 19162,
                        "tid": 2200
                    },
                    {
                        "from": 18920,
                        "to": 19162,
                        "tid": 2100
                    }
                ]
            },
            {
                "name": "Hadley North Tunnel East Bore",
                "type": "tunnel",
                "structureNo": "ECM1-45TA",
                "trackLocation": [
                    {
                        "from": 18920,
                        "to": 19162,
                        "tid": 1100
                    },
                    {
                        "from": 18920,
                        "to": 19162,
                        "tid": 1200
                    }
                ]
            },
            {
                "name": "Potters Bar Tunnel West Bore",
                "type": "tunnel",
                "structureNo": "ECM1-46TD",
                "trackLocation": [
                    {
                        "from": 19888,
                        "to": 21120,
                        "tid": 2200
                    },
                    {
                        "from": 19888,
                        "to": 21120,
                        "tid": 2100
                    }
                ]
            },
            {
                "name": "Potters Bar Tunnel East Bore",
                "type": "tunnel",
                "structureNo": "ECM1-46TC",
                "trackLocation": [
                    {
                        "from": 19888,
                        "to": 21120,
                        "tid": 1100
                    },
                    {
                        "from": 19888,
                        "to": 21120,
                        "tid": 1200
                    }
                ]
            },
            {
                "name": "Welwyn Flyover",
                "type": "viaduct",
                "structureNo": "ECM1-67D",
                "trackLocation": [
                    {
                        "from": 35090,
                        "to": 35310,
                        "tid": 3800
                    }
                ]
            },
            {
                "name": "Welwyn / Digswell Viaduct",
                "type": "viaduct",
                "structureNo": "ECM1-69",
                "trackLocation": [
                    {
                        "from": 37774,
                        "to": 38302,
                        "tid": 2100
                    },
                    {
                        "from": 37774,
                        "to": 38302,
                        "tid": 1100
                    }
                ]
            },
            {
                "name": "Welwyn South Tunnel",
                "type": "tunnel",
                "structureNo": "ECM1-71T",
                "trackLocation": [
                    {
                        "from": 38962,
                        "to": 39402,
                        "tid": 2100
                    },
                    {
                        "from": 38962,
                        "to": 39402,
                        "tid": 1100
                    }
                ]
            },
            {
                "name": "Welwyn North Tunnel",
                "type": "tunnel",
                "structureNo": "ECM1-71TT",
                "trackLocation": [
                    {
                        "from": 39688,
                        "to": 40744,
                        "tid": 2100
                    },
                    {
                        "from": 39688,
                        "to": 40744,
                        "tid": 1100
                    }
                ]
            },
            {
                "name": "New Skelton Bridge (River Ouse)",
                "type": "underbridge",
                "structureNo": "ECM5-12A",
                "trackLocation": [
                    {
                        "from": 337326,
                        "to": 337436,
                        "tid": 2200
                    }
                ]
            },
            {
                "name": "Skelton Bridge (River Ouse)",
                "type": "underbridge",
                "structureNo": "ECM5-12",
                "trackLocation": [
                    {
                        "from": 337326,
                        "to": 337436,
                        "tid": 2100
                    },
                    {
                        "from": 337326,
                        "to": 337436,
                        "tid": 1100
                    }
                ]
            },
            {
                "name": "Leeman Road",
                "type": "underbridge",
                "structureNo": "ECM5-03",
                "trackLocation": [
                    {
                        "from": 332970,
                        "to": 332992,
                        "tid": 2100
                    },
                    {
                        "from": 332970,
                        "to": 332992,
                        "tid": 1100
                    }
                ]
            },
            {
                "name": "Water End",
                "type": "overbridge",
                "structureNo": "ECM5-04",
                "trackLocation": [
                    {
                        "from": 333630,
                        "to": 333652,
                        "tid": 2901,
                        "elr": "HOS"
                    },
                    {
                        "from": 333630,
                        "to": 333652,
                        "tid": 1100
                    }
                ]
            },
            {
                "name": "Sykes Lane",
                "type": "overbridge",
                "structureNo": "ECM5-20",
                "trackLocation": [
                    {
                        "from": 348832,
                        "to": 348854,
                        "tid": 2200,
                        "elr": ""
                    },
                    {
                        "from": 348854,
                        "to": 348876,
                        "tid": 1200,
                        "elr": ""
                    }
                ]
            },
            {
                "name": "Warehills Lane",
                "type": "overbridge",
                "structureNo": "ECM5-19",
                "trackLocation": [
                    {
                        "from": 347699,
                        "to": 347711,
                        "tid": 2200,
                        "elr": ""
                    },
                    {
                        "from": 347688,
                        "to": 347700,
                        "tid": 1200,
                        "elr": ""
                    }
                ]
            },
            {
                "name": "Chapmans Lane",
                "type": "overbridge",
                "structureNo": "ECM5-17",
                "trackLocation": [
                    {
                        "from": 343156,
                        "to": 343166,
                        "tid": 2200,
                        "elr": ""
                    },
                    {
                        "from": 343156,
                        "to": 343166,
                        "tid": 1200,
                        "elr": ""
                    }
                ]
            },
            {
                "name": "Shipton Low Road",
                "type": "overbridge",
                "structureNo": "ECM5-16",
                "trackLocation": [
                    {
                        "from": 341452,
                        "to": 341462,
                        "tid": 2200,
                        "elr": ""
                    },
                    {
                        "from": 341447,
                        "to": 341457,
                        "tid": 1200,
                        "elr": ""
                    }
                ]
            },
            {
                "name": "Overton Road",
                "type": "overbridge",
                "structureNo": "ECM5-15",
                "trackLocation": [
                    {
                        "from": 340005,
                        "to": 340015,
                        "tid": 2200,
                        "elr": ""
                    },
                    {
                        "from": 340049,
                        "to": 340059,
                        "tid": 1200,
                        "elr": ""
                    }
                ]
            },
            {
                "name": "Holgate Bridge",
                "type": "overbridge",
                "structureNo": "ECM4-04",
                "trackLocation": [
                    {
                        "from": 331056,
                        "to": 331078,
                        "tid": 2200,
                        "elr": "HOS"
                    },
                    {
                        "from": 331100,
                        "to": 331122,
                        "tid": 1100,
                        "elr": ""
                    }
                ]
            },
            {
                "name": "Colton Lane",
                "type": "overbridge",
                "structureNo": "ECM3-34",
                "trackLocation": [
                    {
                        "from": 320628,
                        "to": 320638,
                        "tid": 2100,
                        "elr": ""
                    },
                    {
                        "from": 320623,
                        "to": 320633,
                        "tid": 1100,
                        "elr": ""
                    }
                ]
            },
            {
                "name": "Balne Low Gate LC",
                "type": "level_crossing",
                "structureNo": "",
                "trackLocation": [
                    {
                        "from": 290884,
                        "to": 290906,
                        "tid": 2100,
                        "elr": ""
                    },
                    {
                        "from": 290884,
                        "to": 290906,
                        "tid": 1100,
                        "elr": ""
                    }
                ]
            },
            {
                "name": "Balne LC",
                "type": "level_crossing",
                "structureNo": "",
                "trackLocation": [
                    {
                        "from": 292028,
                        "to": 292050,
                        "tid": 2100,
                        "elr": ""
                    },
                    {
                        "from": 292028,
                        "to": 292050,
                        "tid": 1100,
                        "elr": ""
                    }
                ]
            },
            {
                "name": "M62 Motorway",
                "type": "overbridge",
                "structureNo": "ECM2-08A",
                "trackLocation": [
                    {
                        "from": 294910,
                        "to": 294954,
                        "tid": 2100,
                        "elr": ""
                    },
                    {
                        "from": 294910,
                        "to": 294954,
                        "tid": 1100,
                        "elr": ""
                    }
                ]
            },
            {
                "name": "Pollington Lane",
                "type": "overbridge",
                "structureNo": "ECM2-07",
                "trackLocation": [
                    {
                        "from": 294110,
                        "to": 294120,
                        "tid": 2100,
                        "elr": ""
                    },
                    {
                        "from": 294096,
                        "to": 294106,
                        "tid": 1100,
                        "elr": ""
                    }
                ]
            },
            {
                "name": "Green Lane",
                "type": "overbridge",
                "structureNo": "ECM2-08",
                "trackLocation": [
                    {
                        "from": 294722,
                        "to": 294732,
                        "tid": 2100,
                        "elr": ""
                    },
                    {
                        "from": 294746,
                        "to": 294756,
                        "tid": 1100,
                        "elr": ""
                    }
                ]
            },
            {
                "name": "Aire & Calder Navigation",
                "type": "underbridge",
                "structureNo": "ECM2-05",
                "trackLocation": [
                    {
                        "from": 293590,
                        "to": 293615,
                        "tid": 2100,
                        "elr": ""
                    },
                    {
                        "from": 293590,
                        "to": 293615,
                        "tid": 1100,
                        "elr": ""
                    }
                ]
            },
            {
                "name": "River Aire",
                "type": "underbridge",
                "structureNo": "ECM3-1",
                "trackLocation": [
                    {
                        "from": 298364,
                        "to": 298430,
                        "tid": 2100,
                        "elr": ""
                    },
                    {
                        "from": 298364,
                        "to": 298430,
                        "tid": 1100,
                        "elr": ""
                    }
                ]
            },
            {
                "name": "Intersection Bridge",
                "type": "overbridge",
                "structureNo": "ECM3-16",
                "trackLocation": [
                    {
                        "from": 307357,
                        "to": 307367,
                        "tid": 2100,
                        "elr": ""
                    },
                    {
                        "from": 307357,
                        "to": 307367,
                        "tid": 1100,
                        "elr": ""
                    }
                ]
            },
            {
                "name": "Selby Dam Viaduct",
                "type": "viaduct",
                "structureNo": "ECM3-18",
                "trackLocation": [
                    {
                        "from": 308286,
                        "to": 308440,
                        "tid": 2100,
                        "elr": ""
                    },
                    {
                        "from": 308286,
                        "to": 308440,
                        "tid": 1100,
                        "elr": ""
                    }
                ]
            },
            {
                "name": "Ryther Viaduct (River Wharfe)",
                "type": "viaduct",
                "structureNo": "ECM3-30",
                "trackLocation": [
                    {
                        "from": 316866,
                        "to": 317416,
                        "tid": 2100,
                        "elr": ""
                    },
                    {
                        "from": 316866,
                        "to": 317416,
                        "tid": 1100,
                        "elr": ""
                    }
                ]
            },
            {
                "name": "A64 York Bypass",
                "type": "overbridge",
                "structureNo": "ECM4-09A",
                "trackLocation": [
                    {
                        "from": 326832,
                        "to": 326876,
                        "tid": 2150,
                        "elr": ""
                    },
                    {
                        "from": 326854,
                        "to": 326898,
                        "tid": 1100,
                        "elr": ""
                    }
                ]
            },
            {
                "name": "Temple Lane",
                "type": "overbridge",
                "structureNo": "ECM4-11",
                "trackLocation": [
                    {
                        "from": 325226,
                        "to": 325236,
                        "tid": 2150,
                        "elr": ""
                    },
                    {
                        "from": 325226,
                        "to": 325236,
                        "tid": 1100,
                        "elr": ""
                    }
                ]
            },
            {
                "name": "Bond Hill Ash",
                "type": "overbridge",
                "structureNo": "ECM4-09",
                "trackLocation": [
                    {
                        "from": 327052,
                        "to": 327062,
                        "tid": 2150,
                        "elr": ""
                    },
                    {
                        "from": 327074,
                        "to": 327084,
                        "tid": 1100,
                        "elr": ""
                    }
                ]
            },
            {
                "name": "Moor Lane",
                "type": "overbridge",
                "structureNo": "ECM4-08",
                "trackLocation": [
                    {
                        "from": 328394,
                        "to": 328404,
                        "tid": 2150,
                        "elr": ""
                    },
                    {
                        "from": 328394,
                        "to": 328404,
                        "tid": 1100,
                        "elr": ""
                    }
                ]
            },
            {
                "name": "St. Helen's Road",
                "type": "overbridge",
                "structureNo": "ECM4-07",
                "trackLocation": [
                    {
                        "from": 329230,
                        "to": 329240,
                        "tid": 2150,
                        "elr": ""
                    },
                    {
                        "from": 329230,
                        "to": 329240,
                        "tid": 1100,
                        "elr": ""
                    }
                ]
            },
            {
                "name": "Barbara Grove",
                "type": "overbridge",
                "structureNo": "ECM4-05",
                "trackLocation": [
                    {
                        "from": 330870,
                        "to": 330875,
                        "tid": 3903,
                        "elr": ""
                    },
                    {
                        "from": 330870,
                        "to": 330875,
                        "tid": 1100,
                        "elr": ""
                    }
                ]
            },
            {
                "name": "Footbridge",
                "type": "overbridge",
                "structureNo": "ECM4-01",
                "trackLocation": [
                    {
                        "from": 331765,
                        "to": 331770,
                        "tid": 3811,
                        "elr": ""
                    },
                    {
                        "from": 331765,
                        "to": 331770,
                        "tid": 1100,
                        "elr": ""
                    }
                ]
            },
            {
                "name": "A1237 Outer Ring Road",
                "type": "overbridge",
                "structureNo": "ECM5-10A",
                "trackLocation": [
                    {
                        "from": 336182,
                        "to": 336204,
                        "tid": 2200,
                        "elr": ""
                    },
                    {
                        "from": 336182,
                        "to": 336204,
                        "tid": 1100,
                        "elr": ""
                    }
                ]
            },
            {
                "name": "Millfield",
                "type": "underbridge",
                "structureNo": "ECM5-10",
                "trackLocation": [
                    {
                        "from": 335962,
                        "to": 335972,
                        "tid": 2200,
                        "elr": ""
                    },
                    {
                        "from": 335962,
                        "to": 335972,
                        "tid": 1100,
                        "elr": ""
                    }
                ]
            },
            {
                "name": "Whinny Hagg Lane",
                "type": "overbridge",
                "structureNo": "ECM3-15",
                "trackLocation": [
                    {
                        "from": 306355,
                        "to": 306365,
                        "tid": 2100,
                        "elr": ""
                    },
                    {
                        "from": 306350,
                        "to": 306360,
                        "tid": 1100,
                        "elr": ""
                    }
                ]
            },
            {
                "name": "Colton Old Road",
                "type": "overbridge",
                "structureNo": "ECM3-33",
                "trackLocation": [
                    {
                        "from": 319440,
                        "to": 319450,
                        "tid": 2100,
                        "elr": ""
                    },
                    {
                        "from": 319445,
                        "to": 319455,
                        "tid": 1100,
                        "elr": ""
                    }
                ]
            },
            {
                "name": "Church Lane",
                "type": "overbridge",
                "structureNo": "ECM3-32",
                "trackLocation": [
                    {
                        "from": 318934,
                        "to": 318944,
                        "tid": 2100,
                        "elr": ""
                    },
                    {
                        "from": 318934,
                        "to": 318944,
                        "tid": 1100,
                        "elr": ""
                    }
                ]
            },
            {
                "name": "Oak Avenue",
                "type": "overbridge",
                "structureNo": "ECM3-31",
                "trackLocation": [
                    {
                        "from": 318191,
                        "to": 318201,
                        "tid": 2100,
                        "elr": ""
                    },
                    {
                        "from": 318186,
                        "to": 318196,
                        "tid": 1100,
                        "elr": ""
                    }
                ]
            },
            {
                "name": "B1233 Ryther Road",
                "type": "overbridge",
                "structureNo": "ECM3-29",
                "trackLocation": [
                    {
                        "from": 316382,
                        "to": 316392,
                        "tid": 2100,
                        "elr": ""
                    },
                    {
                        "from": 316377,
                        "to": 316387,
                        "tid": 1100,
                        "elr": ""
                    }
                ]
            },
            {
                "name": "Millfield footbridge",
                "type": "overbridge",
                "structureNo": "ECM3-28",
                "trackLocation": [
                    {
                        "from": 315744,
                        "to": 315754,
                        "tid": 2100,
                        "elr": ""
                    },
                    {
                        "from": 315744,
                        "to": 315754,
                        "tid": 1100,
                        "elr": ""
                    }
                ]
            },
            {
                "name": "Underbridge",
                "type": "underbridge",
                "structureNo": "ECM3-27",
                "trackLocation": [
                    {
                        "from": 315717,
                        "to": 315727,
                        "tid": 2100,
                        "elr": ""
                    },
                    {
                        "from": 315722,
                        "to": 315732,
                        "tid": 1100,
                        "elr": ""
                    }
                ]
            },
            {
                "name": "Moor Lane",
                "type": "overbridge",
                "structureNo": "ECM3-26",
                "trackLocation": [
                    {
                        "from": 315128,
                        "to": 315138,
                        "tid": 2100,
                        "elr": ""
                    },
                    {
                        "from": 315133,
                        "to": 315143,
                        "tid": 1100,
                        "elr": ""
                    }
                ]
            },
            {
                "name": "Violet Hill footbridge",
                "type": "overbridge",
                "structureNo": "ECM3-25",
                "trackLocation": [
                    {
                        "from": 314270,
                        "to": 314280,
                        "tid": 2100,
                        "elr": ""
                    },
                    {
                        "from": 314270,
                        "to": 314280,
                        "tid": 1100,
                        "elr": ""
                    }
                ]
            },
            {
                "name": "Bullmoor Drain",
                "type": "underbridge",
                "structureNo": "ECM3-24",
                "trackLocation": [
                    {
                        "from": 312774,
                        "to": 312784,
                        "tid": 2100,
                        "elr": ""
                    },
                    {
                        "from": 312774,
                        "to": 312784,
                        "tid": 1100,
                        "elr": ""
                    }
                ]
            },
            {
                "name": "Biggins footbridge",
                "type": "overbridge",
                "structureNo": "ECM3-23",
                "trackLocation": [
                    {
                        "from": 311916,
                        "to": 311921,
                        "tid": 2100,
                        "elr": ""
                    },
                    {
                        "from": 311916,
                        "to": 311921,
                        "tid": 1100,
                        "elr": ""
                    }
                ]
            },
            {
                "name": "Bishops Dyke",
                "type": "underbridge",
                "structureNo": "ECM3-22",
                "trackLocation": [
                    {
                        "from": 311014,
                        "to": 311024,
                        "tid": 2100,
                        "elr": ""
                    },
                    {
                        "from": 311014,
                        "to": 311024,
                        "tid": 1100,
                        "elr": ""
                    }
                ]
            },
            {
                "name": "B1222 Bishops Dyke Road",
                "type": "overbridge",
                "structureNo": "ECM3-21",
                "trackLocation": [
                    {
                        "from": 310899,
                        "to": 310909,
                        "tid": 2100,
                        "elr": ""
                    },
                    {
                        "from": 310904,
                        "to": 310914,
                        "tid": 1100,
                        "elr": ""
                    }
                ]
            },
            {
                "name": "Werrington Dive Under",
                "type": "underbridge",
                "structureNo": "ECM1-",
                "trackLocation": [
                    {
                        "from": 140118,
                        "to": 140184,
                        "tid": 1150,
                        "elr": "PMJ"
                    },
                    {
                        "from": 140228,
                        "to": 140294,
                        "tid": 1200,
                        "elr": ""
                    }
                ]
            },
            {
                "name": "Nene Viaduct",
                "type": "viaduct",
                "structureNo": "ECM1-184",
                "trackLocation": [
                    {
                        "from": 133298,
                        "to": 133562,
                        "tid": 2200,
                        "elr": ""
                    },
                    {
                        "from": 133298,
                        "to": 133562,
                        "tid": 1200,
                        "elr": ""
                    }
                ]
            },
            {
                "name": "Holme Lode LC",
                "type": "level_crossing",
                "structureNo": "No. 89",
                "trackLocation": [
                    {
                        "from": 123222,
                        "to": 123232,
                        "tid": 2100,
                        "elr": ""
                    },
                    {
                        "from": 123222,
                        "to": 123232,
                        "tid": 1100,
                        "elr": ""
                    }
                ]
            },
            {
                "name": "Holme - Station Road",
                "type": "level_crossing",
                "structureNo": "No. 87",
                "trackLocation": [
                    {
                        "from": 122012,
                        "to": 122022,
                        "tid": 2100,
                        "elr": ""
                    },
                    {
                        "from": 122012,
                        "to": 122022,
                        "tid": 1100,
                        "elr": ""
                    }
                ]
            },
            {
                "name": "Stoke Tunnel",
                "type": "tunnel",
                "structureNo": "ECM1-230T",
                "trackLocation": [
                    {
                        "from": 176858,
                        "to": 177738,
                        "tid": 2100,
                        "elr": ""
                    },
                    {
                        "from": 176858,
                        "to": 177738,
                        "tid": 1100,
                        "elr": ""
                    }
                ]
            },
            {
                "name": "Peascliffe Tunnel",
                "type": "tunnel",
                "structureNo": "ECM1-250T",
                "trackLocation": [
                    {
                        "from": 189750,
                        "to": 190718,
                        "tid": 2100,
                        "elr": ""
                    },
                    {
                        "from": 189750,
                        "to": 190718,
                        "tid": 1100,
                        "elr": ""
                    }
                ]
            },
            {
                "name": "Newark Dyke (River Trent)",
                "type": "underbridge",
                "structureNo": "ECM1-278",
                "trackLocation": [
                    {
                        "from": 212806,
                        "to": 212916,
                        "tid": 2100,
                        "elr": ""
                    },
                    {
                        "from": 212806,
                        "to": 212916,
                        "tid": 1100,
                        "elr": ""
                    }
                ]
            },
            {
                "name": "Muskham Viaduct (River Trent)",
                "type": "underbridge",
                "structureNo": "ECM1-280",
                "trackLocation": [
                    {
                        "from": 213334,
                        "to": 213642,
                        "tid": 2100,
                        "elr": ""
                    },
                    {
                        "from": 213334,
                        "to": 213642,
                        "tid": 1100,
                        "elr": ""
                    }
                ]
            },
            {
                "name": "Church Lane LC CCTV",
                "type": "level_crossing",
                "structureNo": "No. 167",
                "trackLocation": [
                    {
                        "from": 214874,
                        "to": 214884,
                        "tid": 2100,
                        "elr": ""
                    },
                    {
                        "from": 214874,
                        "to": 214884,
                        "tid": 1100,
                        "elr": ""
                    }
                ]
            },
            {
                "name": "Chathill LC",
                "type": "level_crossing",
                "structureNo": "",
                "trackLocation": [
                    {
                        "from": 553846,
                        "to": 553856,
                        "tid": 2100,
                        "elr": ""
                    },
                    {
                        "from": 553846,
                        "to": 553856,
                        "tid": 1100,
                        "elr": ""
                    }
                ]
            },
            {
                "name": "Underbridge",
                "type": "underbridge",
                "structureNo": "ECM5-13",
                "trackLocation": [
                    {
                        "from": 337590,
                        "to": 337600,
                        "tid": 2200,
                        "elr": ""
                    },
                    {
                        "from": 337592,
                        "to": 337600,
                        "tid": 1200,
                        "elr": ""
                    }
                ]
            },
            {
                "name": "Stripe Lane, Skelton (Folly Bridge)",
                "type": "underbridge",
                "structureNo": "ECM5-14",
                "trackLocation": [
                    {
                        "from": 338042,
                        "to": 338052,
                        "tid": 2200,
                        "elr": ""
                    },
                    {
                        "from": 338042,
                        "to": 338052,
                        "tid": 1200,
                        "elr": ""
                    }
                ]
            },
            {
                "name": "Holgate Beck",
                "type": "underbridge",
                "structureNo": "ECM5-03A",
                "trackLocation": [
                    {
                        "from": 333300,
                        "to": 333310,
                        "tid": 2100,
                        "elr": ""
                    },
                    {
                        "from": 333300,
                        "to": 333310,
                        "tid": 1100,
                        "elr": ""
                    }
                ]
            },
            {
                "name": "Carlton Road",
                "type": "overbridge",
                "structureNo": "ECM5-47",
                "trackLocation": [
                    {
                        "from": 370739,
                        "to": 370749,
                        "tid": 2200,
                        "elr": ""
                    },
                    {
                        "from": 370700,
                        "to": 370710,
                        "tid": 1200,
                        "elr": ""
                    }
                ]
            },
            {
                "name": "New Parks Beck",
                "type": "underbridge",
                "structureNo": "ECM5-18A",
                "trackLocation": [
                    {
                        "from": 346104,
                        "to": 346114,
                        "tid": 2200,
                        "elr": ""
                    },
                    {
                        "from": 346104,
                        "to": 346114,
                        "tid": 1200,
                        "elr": ""
                    }
                ]
            },
            {
                "name": "Forest Lane, Alne",
                "type": "overbridge",
                "structureNo": "ECM5-21",
                "trackLocation": [
                    {
                        "from": 351120,
                        "to": 351130,
                        "tid": 2200,
                        "elr": ""
                    },
                    {
                        "from": 351120,
                        "to": 351130,
                        "tid": 1200,
                        "elr": ""
                    }
                ]
            },
            {
                "name": "Easingwold Road",
                "type": "overbridge",
                "structureNo": "ECM5-23",
                "trackLocation": [
                    {
                        "from": 351538,
                        "to": 351548,
                        "tid": 2200,
                        "elr": ""
                    },
                    {
                        "from": 351593,
                        "to": 351603,
                        "tid": 1200,
                        "elr": ""
                    }
                ]
            },
            {
                "name": "Alne Beck",
                "type": "underbridge",
                "structureNo": "ECM5-24",
                "trackLocation": [
                    {
                        "from": 352704,
                        "to": 352714,
                        "tid": 2200,
                        "elr": ""
                    },
                    {
                        "from": 352704,
                        "to": 352714,
                        "tid": 1200,
                        "elr": ""
                    }
                ]
            },
            {
                "name": "Kyle Beck",
                "type": "underbridge",
                "structureNo": "ECM5-25",
                "trackLocation": [
                    {
                        "from": 353562,
                        "to": 353572,
                        "tid": 2200,
                        "elr": ""
                    },
                    {
                        "from": 353562,
                        "to": 353572,
                        "tid": 1200,
                        "elr": ""
                    }
                ]
            },
            {
                "name": "Spring House",
                "type": "underbridge",
                "structureNo": "ECM5-26",
                "trackLocation": [
                    {
                        "from": 354156,
                        "to": 354166,
                        "tid": 2200,
                        "elr": ""
                    },
                    {
                        "from": 354156,
                        "to": 354166,
                        "tid": 1200,
                        "elr": ""
                    }
                ]
            },
            {
                "name": "Hagg Lane",
                "type": "overbridge",
                "structureNo": "ECM5-27",
                "trackLocation": [
                    {
                        "from": 355322,
                        "to": 355332,
                        "tid": 2200,
                        "elr": ""
                    },
                    {
                        "from": 355322,
                        "to": 355332,
                        "tid": 1200,
                        "elr": ""
                    }
                ]
            },
            {
                "name": "Leys Bridge",
                "type": "overbridge",
                "structureNo": "ECM5-28",
                "trackLocation": [
                    {
                        "from": 356180,
                        "to": 356190,
                        "tid": 2200,
                        "elr": ""
                    },
                    {
                        "from": 356180,
                        "to": 356190,
                        "tid": 1200,
                        "elr": ""
                    }
                ]
            },
            {
                "name": "West Moor Road",
                "type": "overbridge",
                "structureNo": "ECM5-29",
                "trackLocation": [
                    {
                        "from": 357632,
                        "to": 357642,
                        "tid": 2200,
                        "elr": ""
                    },
                    {
                        "from": 357627,
                        "to": 357637,
                        "tid": 1200,
                        "elr": ""
                    }
                ]
            },
            {
                "name": "Jobbing Cross",
                "type": "overbridge",
                "structureNo": "ECM5-31",
                "trackLocation": [
                    {
                        "from": 359502,
                        "to": 359512,
                        "tid": 2200,
                        "elr": ""
                    },
                    {
                        "from": 359502,
                        "to": 359512,
                        "tid": 1200,
                        "elr": ""
                    }
                ]
            },
            {
                "name": "Birdforth Beck",
                "type": "underbridge",
                "structureNo": "ECM5-33",
                "trackLocation": [
                    {
                        "from": 360558,
                        "to": 360568,
                        "tid": 2200,
                        "elr": ""
                    },
                    {
                        "from": 360558,
                        "to": 360568,
                        "tid": 1200,
                        "elr": ""
                    }
                ]
            },
            {
                "name": "Low Lane",
                "type": "overbridge",
                "structureNo": "ECM5-34",
                "trackLocation": [
                    {
                        "from": 363407,
                        "to": 363417,
                        "tid": 2200,
                        "elr": ""
                    },
                    {
                        "from": 363402,
                        "to": 363412,
                        "tid": 1200,
                        "elr": ""
                    }
                ]
            },
            {
                "name": "Willow Beck",
                "type": "underbridge",
                "structureNo": "ECM5-35A",
                "trackLocation": [
                    {
                        "from": 364848,
                        "to": 364858,
                        "tid": 2200,
                        "elr": ""
                    },
                    {
                        "from": 364848,
                        "to": 364858,
                        "tid": 1200,
                        "elr": ""
                    }
                ]
            },
            {
                "name": "West Holme",
                "type": "underbridge",
                "structureNo": "ECM5-36",
                "trackLocation": [
                    {
                        "from": 365134,
                        "to": 365144,
                        "tid": 2200,
                        "elr": ""
                    },
                    {
                        "from": 365134,
                        "to": 365144,
                        "tid": 1200,
                        "elr": ""
                    }
                ]
            },
            {
                "name": "Isle Beck Road",
                "type": "underbridge",
                "structureNo": "ECM5-37",
                "trackLocation": [
                    {
                        "from": 365376,
                        "to": 365386,
                        "tid": 2200,
                        "elr": ""
                    },
                    {
                        "from": 365376,
                        "to": 365386,
                        "tid": 1200,
                        "elr": ""
                    }
                ]
            },
            {
                "name": "Cod Beck",
                "type": "underbridge",
                "structureNo": "ECM5-39",
                "trackLocation": [
                    {
                        "from": 366630,
                        "to": 366650,
                        "tid": 2200,
                        "elr": ""
                    },
                    {
                        "from": 366630,
                        "to": 366650,
                        "tid": 1200,
                        "elr": ""
                    }
                ]
            },
            {
                "name": "Thirsk Bypass",
                "type": "overbridge",
                "structureNo": "ECM5-41",
                "trackLocation": [
                    {
                        "from": 368104,
                        "to": 368124,
                        "tid": 2200,
                        "elr": ""
                    },
                    {
                        "from": 368120,
                        "to": 368140,
                        "tid": 1200,
                        "elr": ""
                    }
                ]
            },
            {
                "name": "B1448 Topcliffe Road",
                "type": "overbridge",
                "structureNo": "ECM5-42",
                "trackLocation": [
                    {
                        "from": 368588,
                        "to": 368598,
                        "tid": 2200,
                        "elr": ""
                    },
                    {
                        "from": 368588,
                        "to": 368598,
                        "tid": 1200,
                        "elr": ""
                    }
                ]
            },
            {
                "name": "Millbank Farm",
                "type": "overbridge",
                "structureNo": "ECM5-43",
                "trackLocation": [
                    {
                        "from": 369072,
                        "to": 369082,
                        "tid": 2200,
                        "elr": ""
                    },
                    {
                        "from": 369072,
                        "to": 369082,
                        "tid": 1200,
                        "elr": ""
                    }
                ]
            },
            {
                "name": "Green Lane",
                "type": "overbridge",
                "structureNo": "ECM5-45",
                "trackLocation": [
                    {
                        "from": 370128,
                        "to": 370138,
                        "tid": 2200,
                        "elr": ""
                    },
                    {
                        "from": 370128,
                        "to": 370138,
                        "tid": 1200,
                        "elr": ""
                    }
                ]
            },
            {
                "name": "Carr Plantation",
                "type": "underbridge",
                "structureNo": "ECM5-49",
                "trackLocation": [
                    {
                        "from": 372125,
                        "to": 372135,
                        "tid": 2200,
                        "elr": ""
                    },
                    {
                        "from": 372125,
                        "to": 372135,
                        "tid": 1200,
                        "elr": ""
                    }
                ]
            },
            {
                "name": "Parvins UWC R/G",
                "type": "level_crossing",
                "structureNo": "No. 81",
                "trackLocation": [
                    {
                        "from": 372108,
                        "to": 372118,
                        "tid": 2200,
                        "elr": ""
                    },
                    {
                        "from": 372108,
                        "to": 372118,
                        "tid": 1200,
                        "elr": ""
                    }
                ]
            },
            {
                "name": "Woodhouse Field",
                "type": "underbridge",
                "structureNo": "ECM5-50",
                "trackLocation": [
                    {
                        "from": 372658,
                        "to": 372668,
                        "tid": 2200,
                        "elr": ""
                    },
                    {
                        "from": 372658,
                        "to": 372668,
                        "tid": 1200,
                        "elr": ""
                    }
                ]
            },
            {
                "name": "Vicars Moor",
                "type": "underbridge",
                "structureNo": "ECM5-51",
                "trackLocation": [
                    {
                        "from": 374110,
                        "to": 374120,
                        "tid": 2200,
                        "elr": ""
                    },
                    {
                        "from": 374110,
                        "to": 374120,
                        "tid": 1200,
                        "elr": ""
                    }
                ]
            },
            {
                "name": "Avenue Road",
                "type": "overbridge",
                "structureNo": "ECM5-52",
                "trackLocation": [
                    {
                        "from": 374594,
                        "to": 374604,
                        "tid": 2200,
                        "elr": ""
                    },
                    {
                        "from": 374594,
                        "to": 374604,
                        "tid": 1200,
                        "elr": ""
                    }
                ]
            },
            {
                "name": "Station Road, Otterington",
                "type": "overbridge",
                "structureNo": "ECM5-54",
                "trackLocation": [
                    {
                        "from": 378510,
                        "to": 378520,
                        "tid": 2200,
                        "elr": ""
                    },
                    {
                        "from": 378510,
                        "to": 378520,
                        "tid": 1200,
                        "elr": ""
                    }
                ]
            },
            {
                "name": "Longlands Tunnel",
                "type": "underbridge",
                "structureNo": "ECM5-56A",
                "trackLocation": [
                    {
                        "from": 384186,
                        "to": 384208,
                        "tid": 2100,
                        "elr": ""
                    },
                    {
                        "from": 384131,
                        "to": 384153,
                        "tid": 1100,
                        "elr": ""
                    }
                ]
            },
            {
                "name": "Springwell Tunnel",
                "type": "underbridge",
                "structureNo": "ECM5-62",
                "trackLocation": [
                    {
                        "from": 385088,
                        "to": 385132,
                        "tid": 2100,
                        "elr": ""
                    },
                    {
                        "from": 385132,
                        "to": 385176,
                        "tid": 1100,
                        "elr": ""
                    }
                ]
            },
            {
                "name": "Willow Beck",
                "type": "underbridge",
                "structureNo": "ECM5-61",
                "trackLocation": [
                    {
                        "from": 385066,
                        "to": 385076,
                        "tid": 2100,
                        "elr": ""
                    },
                    {
                        "from": 385066,
                        "to": 385076,
                        "tid": 1100,
                        "elr": ""
                    }
                ]
            },
            {
                "name": "Zetland Road",
                "type": "overbridge",
                "structureNo": "ECM5-64",
                "trackLocation": [
                    {
                        "from": 386199,
                        "to": 386209,
                        "tid": 2800,
                        "elr": ""
                    },
                    {
                        "from": 386199,
                        "to": 386209,
                        "tid": 1100,
                        "elr": ""
                    }
                ]
            },
            {
                "name": "Low Whiske Moor",
                "type": "overbridge",
                "structureNo": "ECM5-66",
                "trackLocation": [
                    {
                        "from": 387640,
                        "to": 387650,
                        "tid": 2100,
                        "elr": ""
                    },
                    {
                        "from": 387640,
                        "to": 387650,
                        "tid": 1100,
                        "elr": ""
                    }
                ]
            },
            {
                "name": "High Street",
                "type": "overbridge",
                "structureNo": "ECM1-181",
                "trackLocation": [
                    {
                        "from": 132220,
                        "to": 132230,
                        "tid": 2200,
                        "elr": ""
                    },
                    {
                        "from": 132220,
                        "to": 132230,
                        "tid": 1100,
                        "elr": ""
                    }
                ]
            },
            {
                "name": "A15 London Road",
                "type": "overbridge",
                "structureNo": "ECM1-182",
                "trackLocation": [
                    {
                        "from": 132858,
                        "to": 132868,
                        "tid": 2200,
                        "elr": ""
                    },
                    {
                        "from": 132891,
                        "to": 132901,
                        "tid": 1200,
                        "elr": ""
                    }
                ]
            },
            {
                "name": "A47 Stoke Parkway",
                "type": "overbridge",
                "structureNo": "ECM1-188D",
                "trackLocation": [
                    {
                        "from": 137346,
                        "to": 137401,
                        "tid": 2150,
                        "elr": "PMJ"
                    },
                    {
                        "from": 137346,
                        "to": 137401,
                        "tid": 1200,
                        "elr": ""
                    }
                ]
            },
            {
                "name": "Station Footbridge",
                "type": "overbridge",
                "structureNo": "ECM1-186",
                "trackLocation": [
                    {
                        "from": 134387,
                        "to": 134392,
                        "tid": 3300,
                        "elr": "EMP"
                    },
                    {
                        "from": 134387,
                        "to": 134392,
                        "tid": 1200,
                        "elr": ""
                    }
                ]
            },
            {
                "name": "Parcels Bridge",
                "type": "overbridge",
                "structureNo": "ECM1-186A",
                "trackLocation": [
                    {
                        "from": 134508,
                        "to": 134513,
                        "tid": 1100,
                        "elr": "EMP"
                    },
                    {
                        "from": 134508,
                        "to": 134513,
                        "tid": 1200,
                        "elr": ""
                    }
                ]
            },
            {
                "name": "Cresent Bridge",
                "type": "overbridge",
                "structureNo": "ECM1-185",
                "trackLocation": [
                    {
                        "from": 134178,
                        "to": 134188,
                        "tid": 3300,
                        "elr": "EMP"
                    },
                    {
                        "from": 134178,
                        "to": 134188,
                        "tid": 1200,
                        "elr": ""
                    }
                ]
            },
            {
                "name": "Westfield Road",
                "type": "overbridge",
                "structureNo": "ECM1-188",
                "trackLocation": [
                    {
                        "from": 135498,
                        "to": 135520,
                        "tid": 2150,
                        "elr": "PMJ"
                    },
                    {
                        "from": 135498,
                        "to": 135520,
                        "tid": 1909,
                        "elr": ""
                    }
                ]
            },
            {
                "name": "Spital Bridge (Mayors Walk)",
                "type": "overbridge",
                "structureNo": "ECM1-187",
                "trackLocation": [
                    {
                        "from": 134849,
                        "to": 134859,
                        "tid": 2150,
                        "elr": "PMJ"
                    },
                    {
                        "from": 134827,
                        "to": 134837,
                        "tid": 3915,
                        "elr": ""
                    }
                ]
            },
            {
                "name": "Tallington - Main Road LC",
                "type": "level_crossing",
                "structureNo": "No. 119",
                "trackLocation": [
                    {
                        "from": 149248,
                        "to": 149263,
                        "tid": 2200,
                        "elr": ""
                    },
                    {
                        "from": 149248,
                        "to": 149263,
                        "tid": 1200,
                        "elr": ""
                    }
                ]
            },
            {
                "name": "Claypole LC CCTV",
                "type": "level_crossing",
                "structureNo": "No. 148",
                "trackLocation": [
                    {
                        "from": 202994,
                        "to": 202999,
                        "tid": 2100,
                        "elr": ""
                    },
                    {
                        "from": 202994,
                        "to": 202999,
                        "tid": 1100,
                        "elr": ""
                    }
                ]
            },
            {
                "name": "Osterfen LC CCTV",
                "type": "level_crossing",
                "structureNo": "No. 149",
                "trackLocation": [
                    {
                        "from": 203390,
                        "to": 203395,
                        "tid": 2100,
                        "elr": ""
                    },
                    {
                        "from": 203390,
                        "to": 203395,
                        "tid": 1100,
                        "elr": ""
                    }
                ]
            },
            {
                "name": "B6166 Lincoln Road",
                "type": "overbridge",
                "structureNo": "ECM1-276",
                "trackLocation": [
                    {
                        "from": 211761,
                        "to": 211771,
                        "tid": 2100,
                        "elr": ""
                    },
                    {
                        "from": 211783,
                        "to": 211793,
                        "tid": 3300,
                        "elr": ""
                    }
                ]
            },
            {
                "name": "A46",
                "type": "overbridge",
                "structureNo": "ECM1-277A",
                "trackLocation": [
                    {
                        "from": 212465,
                        "to": 212475,
                        "tid": 2100,
                        "elr": ""
                    },
                    {
                        "from": 212498,
                        "to": 212508,
                        "tid": 3100,
                        "elr": "NSE"
                    }
                ]
            },
            {
                "name": "Carlton - Station Road",
                "type": "level_crossing",
                "structureNo": "No. 193",
                "trackLocation": [
                    {
                        "from": 222310,
                        "to": 222320,
                        "tid": 2100,
                        "elr": ""
                    },
                    {
                        "from": 222310,
                        "to": 222320,
                        "tid": 1100,
                        "elr": ""
                    }
                ]
            },
            {
                "name": "A1 Sutton Bypass",
                "type": "overbridge",
                "structureNo": "ECM1-282B",
                "trackLocation": [
                    {
                        "from": 223047,
                        "to": 223124,
                        "tid": 2100,
                        "elr": ""
                    },
                    {
                        "from": 223047,
                        "to": 223124,
                        "tid": 1100,
                        "elr": ""
                    }
                ]
            },
            {
                "name": "Intersection Bridge",
                "type": "underbridge",
                "structureNo": "ECM1-82A",
                "trackLocation": [
                    {
                        "from": 46288,
                        "to": 46332,
                        "tid": 2200,
                        "elr": ""
                    },
                    {
                        "from": 46222,
                        "to": 46266,
                        "tid": 1200,
                        "elr": ""
                    }
                ]
            },
            {
                "name": "A602 Broadhall Way",
                "type": "overbridge",
                "structureNo": "ECM1-82B",
                "trackLocation": [
                    {
                        "from": 46948,
                        "to": 46970,
                        "tid": 3605,
                        "elr": "HDB"
                    },
                    {
                        "from": 46948,
                        "to": 46970,
                        "tid": 3900,
                        "elr": ""
                    }
                ]
            },
            {
                "name": "Cambridge Flyover",
                "type": "viaduct",
                "structureNo": "ECM1-105BA",
                "trackLocation": [
                    {
                        "from": 57706,
                        "to": 58190,
                        "tid": 2100,
                        "elr": "DCF"
                    }
                ]
            },
            {
                "name": "Torworth LC CCTV",
                "type": "level_crossing",
                "structureNo": "No. 235",
                "trackLocation": [
                    {
                        "from": 252054,
                        "to": 252064,
                        "tid": 2100,
                        "elr": ""
                    },
                    {
                        "from": 252054,
                        "to": 252064,
                        "tid": 1100,
                        "elr": ""
                    }
                ]
            },
            {
                "name": "Ranskill LC",
                "type": "level_crossing",
                "structureNo": "",
                "trackLocation": [
                    {
                        "from": 253418,
                        "to": 253428,
                        "tid": 2100,
                        "elr": ""
                    },
                    {
                        "from": 253418,
                        "to": 253428,
                        "tid": 1100,
                        "elr": ""
                    }
                ]
            }
        ],
        "altRouteYardageMap": [
            {
                "elr": "PMJ",
                "fromYardageMainRoute": 134672,
                "fromYardageAltRoute": 38833,
                "toYardageMainRoute": 143901,
                "toYardageAltRoute": 29606,
                "_id": "6947cddaef03cff59196f409"
            },
            {
                "elr": "WDU",
                "fromYardageMainRoute": 138682,
                "fromYardageAltRoute": 0,
                "toYardageMainRoute": 140092,
                "toYardageAltRoute": 1400,
                "_id": "6947f057310b22e497611610"
            },
            {
                "elr": "EMP",
                "fromYardageMainRoute": 133872,
                "fromYardageAltRoute": 177008,
                "toYardageMainRoute": 134663,
                "toYardageAltRoute": 177831,
                "_id": "6947ff1f310b22e497624212"
            },
            {
                "elr": "HOS",
                "fromYardageMainRoute": 333646,
                "fromYardageAltRoute": 1856,
                "toYardageMainRoute": 334470,
                "toYardageAltRoute": 2731,
                "_id": "6948f65957b7882b0dedbaef"
            },
            {
                "elr": "HAY1",
                "fromYardageMainRoute": 334652,
                "fromYardageAltRoute": 2875,
                "toYardageMainRoute": 334832,
                "toYardageAltRoute": 3047,
                "_id": "6949005e57b7882b0deed0da"
            },
            {
                "elr": "YMS",
                "fromYardageMainRoute": 331814,
                "fromYardageAltRoute": 25,
                "toYardageMainRoute": 331966,
                "toYardageAltRoute": 180,
                "_id": "69494f0157b7882b0defe886"
            },
            {
                "elr": "LLP3",
                "fromYardageMainRoute": 382837,
                "fromYardageAltRoute": 0,
                "toYardageMainRoute": 384410,
                "toYardageAltRoute": 1557,
                "_id": "694979a457b7882b0df1f4f6"
            },
            {
                "elr": "LLP2",
                "fromYardageMainRoute": 384410,
                "fromYardageAltRoute": 74380,
                "toYardageMainRoute": 385115,
                "toYardageAltRoute": 75143,
                "_id": "694adab857b7882b0df2c262"
            },
            {
                "elr": "REB4",
                "fromYardageMainRoute": 385694,
                "fromYardageAltRoute": 197,
                "toYardageMainRoute": 385978,
                "toYardageAltRoute": -88,
                "_id": "694ae45057b7882b0df37b96"
            },
            {
                "elr": "HDB",
                "fromYardageMainRoute": 46016,
                "fromYardageAltRoute": 48515,
                "toYardageMainRoute": 48525,
                "toYardageAltRoute": 51059,
                "_id": "69527a2e58e5a1d4d1a11d20"
            },
            {
                "elr": "NOG1",
                "fromYardageMainRoute": 186727,
                "fromYardageAltRoute": 186736,
                "toYardageMainRoute": 187150,
                "toYardageAltRoute": 187154,
                "_id": "69542a4ca54ab261b1432210"
            }
        ],
        "switchesAndCrossings": [
            {
                "sc_Name": "1121A",
                "junctionGroup": "East Cowton Crossovers",
                "_id": "694aead39f05575b73c7230a"
            },
            {
                "sc_Name": "1121B",
                "junctionGroup": "East Cowton Crossovers",
                "_id": "694aeadd9f05575b73c72ca4"
            },
            {
                "sc_Name": "1120A",
                "junctionGroup": "East Cowton Crossovers",
                "_id": "694aeae79f05575b73c73641"
            },
            {
                "sc_Name": "1120B",
                "junctionGroup": "East Cowton Crossovers",
                "_id": "694aeaf39f05575b73c73fe1"
            },
            {
                "sc_Name": "861A",
                "junctionGroup": "Tollerton South Junction",
                "_id": "694aed749f05575b73c75cc0"
            },
            {
                "sc_Name": "861B",
                "junctionGroup": "Tollerton South Junction",
                "_id": "694aed7c9f05575b73c76666"
            },
            {
                "sc_Name": "862A",
                "junctionGroup": "Tollerton South Junction",
                "_id": "694aed889f05575b73c7700f"
            },
            {
                "sc_Name": "862B",
                "junctionGroup": "Tollerton South Junction",
                "_id": "694aed939f05575b73c779bb"
            },
            {
                "sc_Name": "863A",
                "junctionGroup": "Tollerton South Junction",
                "_id": "694aed9d9f05575b73c7836a"
            },
            {
                "sc_Name": "863B",
                "junctionGroup": "Tollerton South Junction",
                "_id": "694aeda89f05575b73c78d1c"
            },
            {
                "sc_Name": "864A",
                "junctionGroup": "Tollerton South Junction",
                "_id": "694aedb49f05575b73c796d1"
            },
            {
                "sc_Name": "864B",
                "junctionGroup": "Tollerton South Junction",
                "_id": "694aedbd9f05575b73c7a089"
            },
            {
                "sc_Name": "866A",
                "junctionGroup": "Tollerton North Junction",
                "_id": "694aede39f05575b73c7aa44"
            },
            {
                "sc_Name": "866B",
                "junctionGroup": "Tollerton North Junction",
                "_id": "694aeded9f05575b73c7b402"
            },
            {
                "sc_Name": "865A",
                "junctionGroup": "Tollerton North Junction",
                "_id": "694aedf79f05575b73c7bdc3"
            },
            {
                "sc_Name": "865B",
                "junctionGroup": "Tollerton North Junction",
                "_id": "694aedff9f05575b73c7c787"
            },
            {
                "sc_Name": "851",
                "junctionGroup": "Skelton Bridge Junction",
                "_id": "694aee4f9f05575b73c7d14e"
            },
            {
                "sc_Name": "853A",
                "junctionGroup": "Skelton Bridge Junction",
                "_id": "694aee569f05575b73c7db18"
            },
            {
                "sc_Name": "853B",
                "junctionGroup": "Skelton Bridge Junction",
                "_id": "694aee5e9f05575b73c7e4e5"
            },
            {
                "sc_Name": "855",
                "junctionGroup": "Skelton Bridge Junction",
                "_id": "694aee679f05575b73c7eeb5"
            },
            {
                "sc_Name": "852A",
                "junctionGroup": "Skelton Bridge Junction",
                "_id": "694aee7b9f05575b73c7f888"
            },
            {
                "sc_Name": "852B",
                "junctionGroup": "Skelton Bridge Junction",
                "_id": "694aee889f05575b73c8025e"
            },
            {
                "sc_Name": "854A",
                "junctionGroup": "Skelton Bridge Junction",
                "_id": "694aee929f05575b73c80c37"
            },
            {
                "sc_Name": "854B",
                "junctionGroup": "Skelton Bridge Junction",
                "_id": "694aee9d9f05575b73c81613"
            },
            {
                "sc_Name": "1264A",
                "junctionGroup": "New England North Junction",
                "_id": "694cb27250559398a6be4003"
            },
            {
                "sc_Name": "1264B",
                "junctionGroup": "New England North Junction",
                "_id": "694cb28d50559398a6be4a07"
            },
            {
                "sc_Name": "1265A",
                "junctionGroup": "New England North Junction",
                "_id": "694cb29b50559398a6be540e"
            },
            {
                "sc_Name": "1265B",
                "junctionGroup": "New England North Junction",
                "_id": "694cb2ae50559398a6be5e18"
            },
            {
                "sc_Name": "1266A",
                "junctionGroup": "New England North Junction",
                "_id": "694cb2ba50559398a6be6825"
            },
            {
                "sc_Name": "1266B",
                "junctionGroup": "New England North Junction",
                "_id": "694cb2c250559398a6be7235"
            },
            {
                "sc_Name": "1267A",
                "junctionGroup": "New England North Junction",
                "_id": "694cb2ce50559398a6be7c48"
            },
            {
                "sc_Name": "1267B",
                "junctionGroup": "New England North Junction",
                "_id": "694cb2e850559398a6be9073"
            },
            {
                "sc_Name": "1229",
                "junctionGroup": "Spital Junction",
                "_id": "694cbd2950559398a6bf8380"
            },
            {
                "sc_Name": "1244B",
                "junctionGroup": "Spital Junction",
                "_id": "694cbd5350559398a6bf982f"
            },
            {
                "sc_Name": "1216B",
                "junctionGroup": "Cresent Junction",
                "_id": "694cbd8850559398a6bfa28a"
            },
            {
                "sc_Name": "1217A",
                "junctionGroup": "Cresent Junction",
                "_id": "694cbd9350559398a6bface8"
            },
            {
                "sc_Name": "1170A",
                "junctionGroup": "Stilton Fen Emergency Crossover",
                "_id": "694cf7a537571f1e58e837bb"
            },
            {
                "sc_Name": "1171B",
                "junctionGroup": "Stilton Fen Emergency Crossover",
                "_id": "694cf7b337571f1e58e8421f"
            },
            {
                "sc_Name": "1198",
                "junctionGroup": "Fletton Junction",
                "_id": "694cf7d637571f1e58e84c86"
            },
            {
                "sc_Name": "1203",
                "junctionGroup": "Fletton Junction",
                "_id": "694cf7e137571f1e58e856f0"
            },
            {
                "sc_Name": "1293A",
                "junctionGroup": "Tallington Crossovers",
                "_id": "695133d67ba263398b5b7b00"
            },
            {
                "sc_Name": "1297B",
                "junctionGroup": "Tallington Crossovers",
                "_id": "695133e17ba263398b5b8604"
            },
            {
                "sc_Name": "2126A",
                "junctionGroup": "Peascliffe Crossovers",
                "_id": "69513ea7133285f28bb68eae"
            },
            {
                "sc_Name": "2126B",
                "junctionGroup": "Peascliffe Crossovers",
                "_id": "69513f06133285f28bb6bb59"
            },
            {
                "sc_Name": "2120B",
                "junctionGroup": "Peascliffe Crossovers",
                "_id": "69514222133285f28bb713e1"
            },
            {
                "sc_Name": "2153",
                "junctionGroup": "Claypole Emergency Crossovers",
                "_id": "6951720f3291a9e05f23f9c2"
            },
            {
                "sc_Name": "2157",
                "junctionGroup": "Claypole Emergency Crossovers",
                "_id": "695172183291a9e05f24050d"
            },
            {
                "sc_Name": "2203",
                "junctionGroup": "Carlton Emergency Crossovers",
                "_id": "69519be1c356c5ac32ec443b"
            },
            {
                "sc_Name": "2A",
                "junctionGroup": "Carlton Emergency Crossovers",
                "_id": "69519bedc356c5ac32ec4fee"
            },
            {
                "sc_Name": "2192A",
                "junctionGroup": "Marshmoor Crossover",
                "_id": "695266e0d9a6d11292f5f3d8"
            },
            {
                "sc_Name": "2192B",
                "junctionGroup": "Marshmoor Crossover",
                "_id": "695266e9d9a6d11292f5ffcd"
            },
            {
                "sc_Name": "5566A",
                "junctionGroup": "Woolmer Green Junction",
                "_id": "69526d5fd9a6d11292f6fa48"
            },
            {
                "sc_Name": "5569",
                "junctionGroup": "Woolmer Green Junction",
                "_id": "69526d6ad9a6d11292f70683"
            },
            {
                "sc_Name": "5603",
                "junctionGroup": "Langley Junction",
                "_id": "69527f3358e5a1d4d1a1c883"
            },
            {
                "sc_Name": "5604B",
                "junctionGroup": "Langley Junction",
                "_id": "69527f4858e5a1d4d1a1d508"
            },
            {
                "sc_Name": "5824A",
                "junctionGroup": "Cadwell",
                "_id": "69540c79d7f0fd191d79b695"
            },
            {
                "sc_Name": "5824B",
                "junctionGroup": "Cadwell",
                "_id": "69540c84d7f0fd191d79c37c"
            },
            {
                "sc_Name": "1102A",
                "junctionGroup": "Sandy South Junction",
                "_id": "69541797a54ab261b140bf23"
            },
            {
                "sc_Name": "1101B",
                "junctionGroup": "Sandy South Junction",
                "_id": "695417a3a54ab261b140cc38"
            },
            {
                "sc_Name": "1107A",
                "junctionGroup": "Sandy North Junction",
                "_id": "69541851a54ab261b140f31a"
            },
            {
                "sc_Name": "1107B",
                "junctionGroup": "Sandy North Junction",
                "_id": "6954185ea54ab261b141003d"
            },
            {
                "sc_Name": "1122A",
                "junctionGroup": "St. Neots South Junction",
                "_id": "69541c7da54ab261b141684a"
            },
            {
                "sc_Name": "1126B",
                "junctionGroup": "St. Neots South Junction",
                "_id": "69541c8ca54ab261b1417593"
            },
            {
                "sc_Name": "1129A",
                "junctionGroup": "St. Neots North Junction",
                "_id": "69541c9fa54ab261b14182df"
            },
            {
                "sc_Name": "1129B",
                "junctionGroup": "St. Neots North Junction",
                "_id": "69541caca54ab261b141902e"
            },
            {
                "sc_Name": "1140A",
                "junctionGroup": "Huntingdon South Junction",
                "_id": "69541f44a54ab261b141b7b2"
            },
            {
                "sc_Name": "1141B",
                "junctionGroup": "Huntingdon South Junction",
                "_id": "69541f51a54ab261b141c50f"
            },
            {
                "sc_Name": "1144B",
                "junctionGroup": "Huntingdon North Junction",
                "_id": "695421a3a54ab261b1421468"
            },
            {
                "sc_Name": "1148B",
                "junctionGroup": "Huntingdon North Junction",
                "_id": "695421ada54ab261b14221e7"
            },
            {
                "sc_Name": "1158",
                "junctionGroup": "Woodwalton Junction",
                "_id": "695421e6a54ab261b1422f69"
            },
            {
                "sc_Name": "1159A",
                "junctionGroup": "Conington South Junction",
                "_id": "69542301a54ab261b14264c9"
            },
            {
                "sc_Name": "1163B",
                "junctionGroup": "Conington South Junction",
                "_id": "6954230ba54ab261b142725d"
            },
            {
                "sc_Name": "1315",
                "junctionGroup": "Stoke Junction",
                "_id": "69542375a54ab261b1427ff4"
            },
            {
                "sc_Name": "1317-2B",
                "junctionGroup": "Stoke Junction",
                "_id": "695423d7a54ab261b142a836"
            },
            {
                "sc_Name": "2101",
                "junctionGroup": "Highdyke Junction",
                "_id": "695423f6a54ab261b142b5d3"
            },
            {
                "sc_Name": "2103A",
                "junctionGroup": "Grantham South Junction",
                "_id": "69542416a54ab261b142c373"
            },
            {
                "sc_Name": "2105",
                "junctionGroup": "Grantham South Junction",
                "_id": "6954245aa54ab261b142d116"
            },
            {
                "sc_Name": "2117",
                "junctionGroup": "Nottingham Branch Junction",
                "_id": "695426a6a54ab261b142f985"
            },
            {
                "sc_Name": "2118",
                "junctionGroup": "Grantham North Junction",
                "_id": "695427dba54ab261b1430736"
            },
            {
                "sc_Name": "2115",
                "junctionGroup": "Nottingham Branch Junction",
                "_id": "69542b4ca54ab261b1435821"
            },
            {
                "sc_Name": "2119B",
                "junctionGroup": "Grantham North Junction",
                "_id": "69542b68a54ab261b14365e4"
            },
            {
                "sc_Name": "2221-2A",
                "junctionGroup": "Tuxford Emergency Crossovers",
                "_id": "69542d1aa54ab261b1439c69"
            },
            {
                "sc_Name": "2221-3B",
                "junctionGroup": "Tuxford Emergency Crossovers",
                "_id": "69542d2aa54ab261b143aa3a"
            },
            {
                "sc_Name": "2241A",
                "junctionGroup": "Retford South Junction",
                "_id": "69543051a54ab261b143ee4c"
            },
            {
                "sc_Name": "2242",
                "junctionGroup": "Retford South Junction",
                "_id": "6954305da54ab261b143fc37"
            },
            {
                "sc_Name": "2245B",
                "junctionGroup": "Retford West Junction",
                "_id": "695432f4a54ab261b14440bb"
            },
            {
                "sc_Name": "2246",
                "junctionGroup": "Retford West Junction",
                "_id": "695432fea54ab261b1444ebe"
            },
            {
                "sc_Name": "2258A",
                "junctionGroup": "Retford North",
                "_id": "695434f3a54ab261b144af46"
            },
            {
                "sc_Name": "2258B",
                "junctionGroup": "Retford North",
                "_id": "695434fda54ab261b144bd65"
            },
            {
                "sc_Name": "2269-2A",
                "junctionGroup": "Ranskill Emergency Crossovers",
                "_id": "695438c5a54ab261b1451ecf"
            },
            {
                "sc_Name": "2269-3B",
                "junctionGroup": "Ranskill Emergency Crossovers",
                "_id": "695438d4a54ab261b1452d18"
            },
            {
                "sc_Name": "2271-2A",
                "junctionGroup": "Bawtry Emergency Crossovers",
                "_id": "69543a07a54ab261b145654a"
            },
            {
                "sc_Name": "2271-3B",
                "junctionGroup": "Bawtry Emergency Crossovers",
                "_id": "69543a15a54ab261b14573a1"
            }
        ]
    }
];
