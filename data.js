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
                    "type": "buffer_stop"
                },
                "toConnection": {
                    "type": "junction",
                    "at": 459,
                    "track": 3101,
                    "sc_name": "5041"
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
                    "type": "buffer_stop"
                },
                "toConnection": {
                    "type": "junction",
                    "at": 459,
                    "track": 3101,
                    "sc_name": "5041"
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
                    "sc_name": "5006A"
                },
                "toConnection": {
                    "type": "junction",
                    "at": 419,
                    "track": 3102,
                    "sc_name": "5006B"
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
                    "type": "buffer_stop"
                },
                "toConnection": {
                    "type": "junction",
                    "at": 419,
                    "track": 3102,
                    "sc_name": "5006B"
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
                    "sc_name": "750A"
                },
                "toConnection": {
                    "type": "junction",
                    "at": 418921,
                    "track": 2100,
                    "sc_name": "750B"
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
                    "type": "buffer_stop"
                },
                "toConnection": {
                    "type": "junction",
                    "at": 469,
                    "track": 3103,
                    "sc_name": "5058"
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
                    "type": "buffer_stop"
                },
                "toConnection": {
                    "type": "junction",
                    "at": 428,
                    "track": 3105,
                    "sc_name": "5035"
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
                    "type": "buffer_stop"
                },
                "toConnection": {
                    "type": "junction",
                    "at": 469,
                    "track": 3103,
                    "sc_name": "5058"
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
                    "sc_name": "5012A"
                },
                "toConnection": {
                    "type": "junction",
                    "at": 424,
                    "track": 3606,
                    "sc_name": "5012B"
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
                    "sc_name": "5052"
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
                    "sc_name": "5018"
                },
                "toConnection": {
                    "type": "junction",
                    "at": 461,
                    "track": 3104,
                    "sc_name": "5052"
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
                    "type": "buffer_stop"
                },
                "toConnection": {
                    "type": "junction",
                    "at": 450,
                    "track": 3105,
                    "sc_name": "5024B"
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
                    "sc_name": "5024A"
                },
                "toConnection": {
                    "type": "junction",
                    "at": 450,
                    "track": 3105,
                    "sc_name": "5024B"
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
                    "type": "buffer_stop"
                },
                "toConnection": {
                    "type": "junction",
                    "at": 461,
                    "track": 3106,
                    "sc_name": "5047"
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
                    "type": "buffer_stop"
                },
                "toConnection": {
                    "type": "junction",
                    "at": 410,
                    "track": 3610,
                    "sc_name": "5029"
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
                    "type": "buffer_stop"
                },
                "toConnection": {
                    "type": "junction",
                    "at": 461,
                    "track": 3106,
                    "sc_name": "5047"
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
                    "sc_name": "5075A"
                },
                "toConnection": {
                    "type": "junction",
                    "at": 994,
                    "track": 3102,
                    "sc_name": "5075B"
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
                    "sc_name": "5063A"
                },
                "toConnection": {
                    "type": "junction",
                    "at": 742,
                    "track": 3104,
                    "sc_name": "5063B"
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
                    "sc_name": "5081A"
                },
                "toConnection": {
                    "type": "junction",
                    "at": 990,
                    "track": 3103,
                    "sc_name": "5081B"
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
                    "sc_name": "5086"
                },
                "toConnection": {
                    "type": "junction",
                    "at": 1208,
                    "track": 3104,
                    "sc_name": "5097"
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
                    "sc_name": "5070A"
                },
                "toConnection": {
                    "type": "junction",
                    "at": 687,
                    "track": 3105,
                    "sc_name": "5070B"
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
                    "type": "fixed"
                },
                "toConnection": {
                    "type": "junction",
                    "at": 141,
                    "track": 1100,
                    "sc_name": "5119"
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
                    "sc_name": "801"
                },
                "shape": [
                    {
                        "from": 331814,
                        "to": 332112,
                        "yFrom": null,
                        "yTo": 52,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "tid": 3704,
                "altRoute": null,
                "fromConnection": {
                    "type": "junction",
                    "at": 1253,
                    "track": 1100
                },
                "toConnection": {
                    "type": "junction",
                    "at": 1375,
                    "track": 3104
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
                    "sc_name": "5562"
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
                    "track": 1200
                },
                "toConnection": {
                    "type": "junction",
                    "at": 1377,
                    "track": 3106
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
                "tid": 2200,
                "altRoute": null,
                "fromConnection": null,
                "toConnection": {
                    "type": "junction",
                    "at": 37351,
                    "track": 2100,
                    "sc_name": "5561B"
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
                        "to": 37307,
                        "yFrom": 48,
                        "yTo": 48,
                        "electrification": "overhead"
                    },
                    {
                        "from": 37307,
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
                    "track": 2200
                },
                "toConnection": {
                    "type": "junction",
                    "at": 1563,
                    "track": 1200
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
                    "track": 2100
                },
                "toConnection": {
                    "type": "junction",
                    "at": 1751,
                    "track": 1100
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
                    "track": 2100
                },
                "toConnection": {
                    "type": "junction",
                    "at": 2673,
                    "track": 2200
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
                    "track": 1100
                },
                "toConnection": {
                    "type": "junction",
                    "at": 2718,
                    "track": 1200
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
                    "track": 1200
                },
                "toConnection": {
                    "type": "junction",
                    "at": 2888,
                    "track": 1100
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
                    "track": 2200
                },
                "toConnection": {
                    "type": "junction",
                    "at": 3165,
                    "track": 2100
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
                    "track": 2200
                },
                "toConnection": {
                    "type": "fixed",
                    "at": null
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
                    "track": 3106
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
                    "track": 3106
                },
                "toConnection": {
                    "type": "junction",
                    "at": 1278,
                    "track": 3105
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
                    "track": 3106
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
                    "track": 3106
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
                    "track": 1100
                },
                "toConnection": {
                    "type": "junction",
                    "at": 3420,
                    "track": 1200
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
                    "track": 1200
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
                    "track": 2200
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
                    "track": 2101
                },
                "toConnection": {
                    "type": "junction",
                    "at": 4787,
                    "track": 2252
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
                    "sc_name": "2142B"
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
                    "elr": "ECM1"
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
                    "track": 2252
                },
                "toConnection": {
                    "type": "junction",
                    "at": 4888,
                    "track": 2101
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
                    "track": 2200
                },
                "toConnection": {
                    "type": "junction",
                    "at": 4933,
                    "track": 2100
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
                    "track": 2200
                },
                "toConnection": {
                    "type": "junction",
                    "at": 4680,
                    "track": 2101
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
                    "track": 1100
                },
                "toConnection": {
                    "type": "junction",
                    "at": 4719,
                    "track": 2100
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
                    "track": 1200
                },
                "toConnection": {
                    "type": "junction",
                    "at": 4933,
                    "track": 1100
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
                    "track": 1202
                },
                "toConnection": {
                    "type": "junction",
                    "at": 4943,
                    "track": 1200
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
                    "track": 2300
                },
                "toConnection": {
                    "type": "junction",
                    "at": 4235,
                    "track": 2101
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
                    "track": 2200
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
                    "elr": "ECM1"
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
                    "elr": "MEB1"
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
                    "elr": "CFP"
                },
                "toConnection": {
                    "type": "junction",
                    "at": 4226,
                    "track": 1202
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
                    "elr": "MEB1"
                },
                "toConnection": {
                    "type": "junction",
                    "at": 3994,
                    "track": 1100,
                    "elr": "CFP"
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
                    "at": 5362
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
                    "sc_name": "2102A"
                },
                "toConnection": {
                    "type": "junction",
                    "at": 5811,
                    "track": 1202,
                    "sc_name": "2102B"
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
                    "sc_name": "2103A"
                },
                "toConnection": {
                    "type": "junction",
                    "at": 5810,
                    "track": 3802,
                    "sc_name": "2103B"
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
                    "sc_name": "2103A"
                },
                "toConnection": {
                    "type": "junction",
                    "at": 5894,
                    "track": 3802,
                    "sc_name": "2103B"
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
                    "sc_name": "2104"
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
                    "sc_name": "2107A"
                },
                "toConnection": {
                    "type": "junction",
                    "at": 5966,
                    "track": 3801,
                    "sc_name": "2107B"
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
                    "sc_name": "2108A"
                },
                "toConnection": {
                    "type": "junction",
                    "at": 6031,
                    "track": 1202,
                    "sc_name": "2108B"
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
                    "sc_name": "2109"
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
                    "sc_name": "2119A"
                },
                "toConnection": {
                    "type": "junction",
                    "at": 6731,
                    "track": 3800,
                    "sc_name": "2119B"
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
                    "sc_name": "2121A"
                },
                "toConnection": {
                    "type": "junction",
                    "at": 6812,
                    "track": 2252,
                    "sc_name": "2121B"
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
                    "sc_name": "2117"
                },
                "toConnection": {
                    "type": "buffer"
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
                    "sc_name": "2118A"
                },
                "toConnection": {
                    "type": "junction",
                    "at": 6728,
                    "track": 3901,
                    "sc_name": "2118B"
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
                    "sc_name": "2122A"
                },
                "toConnection": {
                    "type": "junction",
                    "at": 6846,
                    "track": 2200,
                    "sc_name": "2122B"
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
                    "sc_name": "2117"
                },
                "toConnection": {
                    "type": "buffer"
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
                    "sc_name": "2123A"
                },
                "toConnection": {
                    "type": "junction",
                    "at": 6842,
                    "track": 3901,
                    "sc_name": "2123B"
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
                    "sc_name": "2120A"
                },
                "toConnection": {
                    "type": "junction",
                    "at": 6778,
                    "track": 3800,
                    "sc_name": "2120B"
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
                    "sc_name": "2148"
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
                    "sc_name": "2148"
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
                    "type": "buffer"
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
                    "sc_name": "2148"
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
                    "type": "buffer"
                },
                "toConnection": {
                    "type": "junction",
                    "at": 34810,
                    "track": 3800,
                    "sc_name": "5506B"
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
                    "sc_name": "5506A"
                },
                "toConnection": {
                    "type": "junction",
                    "at": 35535,
                    "track": 2500,
                    "sc_name": "5511B"
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
                    "sc_name": "5507A"
                },
                "toConnection": {
                    "type": "junction",
                    "at": 35559,
                    "track": 1500,
                    "sc_name": "5517B"
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
                    "sc_name": "5517A"
                },
                "toConnection": {
                    "type": "junction",
                    "at": 36002,
                    "track": 1200,
                    "sc_name": "5525"
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
                "tid": 2500,
                "altRoute": null,
                "fromConnection": {
                    "type": "junction",
                    "at": 35459,
                    "track": 2200,
                    "sc_name": "5517A"
                },
                "toConnection": {
                    "type": "junction",
                    "at": 35998,
                    "track": 2200,
                    "sc_name": "5525"
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
                        "to": 35954,
                        "yFrom": 47,
                        "yTo": 47,
                        "electrification": "overhead"
                    },
                    {
                        "from": 35954,
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
                    "sc_name": "5568"
                },
                "toConnection": {
                    "type": "junction",
                    "at": 121689,
                    "track": 2100,
                    "sc_name": "1166"
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
                    "sc_name": "5569"
                },
                "toConnection": {
                    "type": "junction",
                    "at": 104262,
                    "track": 1100,
                    "sc_name": "1146"
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
                    "sc_name": "1158"
                },
                "toConnection": {
                    "type": "junction",
                    "at": 118369,
                    "track": 1100,
                    "sc_name": "1161"
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
                    "sc_name": "831A"
                },
                "toConnection": {
                    "type": "junction",
                    "at": 334239,
                    "track": 2100,
                    "sc_name": "831B"
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
                "tid": 1200,
                "altRoute": null,
                "fromConnection": {
                    "type": "junction",
                    "at": 334252,
                    "track": 2100,
                    "sc_name": "832A"
                },
                "toConnection": {
                    "type": "junction",
                    "at": 337193,
                    "track": 2100,
                    "sc_name": "851"
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
                    "sc_name": "834A"
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
                    "sc_name": "835A"
                },
                "toConnection": {
                    "type": "junction",
                    "at": 337288,
                    "track": 1100,
                    "sc_name": "835B"
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
                "tid": 1200,
                "altRoute": null,
                "fromConnection": {
                    "type": "junction",
                    "at": 337548,
                    "track": 1100,
                    "sc_name": "832A"
                },
                "toConnection": {
                    "type": "junction",
                    "at": 384063,
                    "track": 1100,
                    "sc_name": "884"
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
                    "sc_name": "881A"
                },
                "toConnection": {
                    "type": "junction",
                    "at": 382554,
                    "track": 2100,
                    "sc_name": "881B"
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
                    "sc_name": "882A"
                },
                "toConnection": {
                    "type": "junction",
                    "at": 382731,
                    "track": 2200,
                    "sc_name": "882B"
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
                    "sc_name": "751A"
                },
                "toConnection": {
                    "type": "junction",
                    "at": 418808,
                    "track": 1100,
                    "sc_name": "751B"
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
                "tid": 3700,
                "altRoute": null,
                "fromConnection": {
                    "type": "junction",
                    "at": 397502,
                    "track": 1100,
                    "sc_name": "1121A"
                },
                "toConnection": {
                    "type": "junction",
                    "at": 397600,
                    "track": 2100,
                    "sc_name": "1121B"
                },
                "shape": [
                    {
                        "from": 397502,
                        "to": 397600,
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
                    "sc_name": "786B"
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
                    "sc_name": "2295AB"
                },
                "toConnection": {
                    "type": "junction",
                    "at": 322052,
                    "track": 1100,
                    "sc_name": "2295C"
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
                    "sc_name": "2295AB"
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
                    "sc_name": "2296"
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
                    "sc_name": "2297A"
                },
                "toConnection": {
                    "type": "junction",
                    "at": 323311,
                    "track": 2100,
                    "sc_name": "2297B"
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
                    "sc_name": "2298A"
                },
                "toConnection": {
                    "type": "junction",
                    "at": 323532,
                    "track": 1150,
                    "sc_name": "2298B"
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
                    "sc_name": "2299A"
                },
                "toConnection": {
                    "type": "junction",
                    "at": 323717,
                    "track": 2150,
                    "sc_name": "2299B"
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
                    "sc_name": "761A"
                },
                "toConnection": {
                    "type": "junction",
                    "at": 330049,
                    "track": 2150,
                    "sc_name": "761B"
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
                    "sc_name": "762A"
                },
                "toConnection": {
                    "type": "junction",
                    "at": 330803,
                    "track": 2150,
                    "sc_name": "767B"
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
                    "at": 330003
                },
                "toConnection": {
                    "type": "junction",
                    "at": 330117,
                    "track": 3500,
                    "sc_name": "762B"
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
                    "sc_name": "763"
                },
                "toConnection": {
                    "type": "junction",
                    "at": 331019,
                    "track": 2150,
                    "sc_name": "776B"
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
                    "sc_name": "764"
                },
                "toConnection": {
                    "type": "junction",
                    "at": 330953,
                    "track": 3901,
                    "sc_name": "775"
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
                    "sc_name": "765"
                },
                "toConnection": {
                    "type": "junction",
                    "at": 330924,
                    "track": 3902,
                    "sc_name": "774"
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
                    "sc_name": "771A"
                },
                "toConnection": {
                    "type": "junction",
                    "at": 330901,
                    "track": 1150,
                    "sc_name": "771B"
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
                    "sc_name": "768A"
                },
                "toConnection": {
                    "type": "junction",
                    "at": 330908,
                    "track": 2100,
                    "sc_name": "768B"
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
                    "sc_name": "772A"
                },
                "toConnection": {
                    "type": "junction",
                    "at": 331026,
                    "track": 2100,
                    "sc_name": "772B"
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
                    "sc_name": "777A"
                },
                "toConnection": {
                    "type": "junction",
                    "at": 331986,
                    "track": 3810,
                    "sc_name": "803"
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
                    "sc_name": "786A"
                },
                "toConnection": {
                    "type": "junction",
                    "at": 332060,
                    "track": 3800,
                    "sc_name": "804"
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
                    "sc_name": "789A"
                },
                "toConnection": {
                    "type": "junction",
                    "at": 331299,
                    "track": 3811,
                    "sc_name": "789B"
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
                    "sc_name": "781A"
                },
                "toConnection": {
                    "type": "junction",
                    "at": 331197,
                    "track": 1100,
                    "sc_name": "781B"
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
                    "sc_name": "783A"
                },
                "toConnection": {
                    "type": "junction",
                    "at": 331359,
                    "track": 2100,
                    "sc_name": "783B"
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
                    "sc_name": "788"
                },
                "toConnection": {
                    "type": "buffer_stop",
                    "at": 331751
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
                    "sc_name": "784"
                },
                "toConnection": {
                    "type": "junction",
                    "at": 332060,
                    "track": 3800,
                    "sc_name": "804"
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
                    "sc_name": "784"
                },
                "toConnection": {
                    "type": "buffer_stop"
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
                    "sc_name": "785"
                },
                "toConnection": {
                    "type": "buffer_stop"
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
                    "type": "buffer"
                },
                "toConnection": {
                    "type": "junction",
                    "at": 332116,
                    "track": 2100,
                    "sc_name": "807"
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
                    "sc_name": "808A"
                },
                "toConnection": {
                    "type": "junction",
                    "at": 332182,
                    "track": 2100,
                    "sc_name": "808B"
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
                    "sc_name": "804"
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
                    "sc_name": "812B"
                }
            },
            {
                "tid": 3701,
                "altRoute": null,
                "fromConnection": {
                    "type": "junction",
                    "at": 332101,
                    "track": 3800,
                    "sc_name": "806A"
                },
                "toConnection": {
                    "type": "junction",
                    "at": 332261,
                    "track": 2100,
                    "sc_name": "806B"
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
                    "sc_name": "811A"
                },
                "toConnection": {
                    "type": "junction",
                    "at": 332365,
                    "track": 1100,
                    "sc_name": "811B"
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
                    "sc_name": "812A"
                },
                "toConnection": {
                    "type": "buffer_stop"
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
                    "sc_name": "787A"
                },
                "toConnection": {
                    "type": "buffer_stop"
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
                    "sc_name": "790"
                },
                "toConnection": {
                    "type": "buffer_stop"
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
                    "sc_name": "852A"
                },
                "toConnection": {
                    "type": "junction",
                    "at": 337304,
                    "track": 2100,
                    "sc_name": "852B"
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
                    "sc_name": "854A"
                },
                "toConnection": {
                    "type": "junction",
                    "at": 337572,
                    "track": 2200,
                    "sc_name": "854B"
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
                    "sc_name": "843A"
                },
                "toConnection": {
                    "type": "junction",
                    "at": 334806,
                    "track": 1200,
                    "sc_name": "843B"
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
                    "sc_name": "842"
                },
                "toConnection": null,
                "shape": [
                    {
                        "from": 334652,
                        "to": 334752,
                        "yFrom": null,
                        "yTo": 45,
                        "electrification": "none"
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
                "toConnection": {
                    "type": "junction",
                    "at": 334611,
                    "track": 2200,
                    "sc_name": "834B"
                },
                "shape": [
                    {
                        "from": 333542,
                        "to": 334356,
                        "yFrom": 45,
                        "yTo": 45,
                        "electrification": "overhead"
                    },
                    {
                        "from": 334356,
                        "to": 334411,
                        "yFrom": 45,
                        "yTo": 47,
                        "electrification": "overhead"
                    },
                    {
                        "from": 334411,
                        "to": 334611,
                        "yFrom": 47,
                        "yTo": null,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "fromConnection": null,
                "tid": 2901,
                "altRoute": {
                    "elr": "HOS",
                    "showAltRuler": false
                },
                "toConnection": {
                    "type": "junction",
                    "at": 334647,
                    "track": 2200,
                    "sc_name": "841B"
                },
                "shape": [
                    {
                        "from": 333542,
                        "to": 334378,
                        "yFrom": 44,
                        "yTo": 44,
                        "electrification": "overhead"
                    },
                    {
                        "from": 334378,
                        "to": 334422,
                        "yFrom": 44,
                        "yTo": 46,
                        "electrification": "overhead"
                    },
                    {
                        "from": 334422,
                        "to": 334600,
                        "yFrom": 46,
                        "yTo": 46,
                        "electrification": "overhead"
                    },
                    {
                        "from": 334600,
                        "to": 334647,
                        "yFrom": 46,
                        "yTo": null,
                        "electrification": "overhead"
                    }
                ]
            },
            {
                "fromConnection": null,
                "tid": 1200,
                "altRoute": {
                    "elr": "HOS",
                    "showAltRuler": false
                },
                "toConnection": {
                    "type": "junction",
                    "at": 334470,
                    "track": 1200,
                    "sc_name": "832B"
                },
                "shape": [
                    {
                        "from": 333542,
                        "to": 334300,
                        "yFrom": 46,
                        "yTo": 46,
                        "electrification": "overhead"
                    },
                    {
                        "from": 334300,
                        "to": 334446,
                        "yFrom": 46,
                        "yTo": 48,
                        "electrification": "overhead"
                    },
                    {
                        "from": 334446,
                        "to": 334470,
                        "yFrom": 48,
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
                    "at": 348532,
                    "track": 1100,
                    "sc_name": "862A"
                },
                "toConnection": {
                    "type": "junction",
                    "at": 348597,
                    "track": 2100,
                    "sc_name": "862B"
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
                    "sc_name": "863A"
                },
                "toConnection": {
                    "type": "junction",
                    "at": 348820,
                    "track": 2200,
                    "sc_name": "863B"
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
                    "sc_name": "864A"
                },
                "toConnection": {
                    "type": "junction",
                    "at": 348839,
                    "track": 1200,
                    "sc_name": "864B"
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
                    "type": "buffer"
                },
                "toConnection": {
                    "type": "junction",
                    "at": 348557,
                    "track": 3900,
                    "sc_name": "861B"
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
                    "sc_name": "861A"
                },
                "toConnection": {
                    "type": "buffer_stop"
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
                    "type": "buffer_stop"
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
                    "type": "buffer_stop"
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
                    "sc_name": "865A"
                },
                "toConnection": {
                    "type": "junction",
                    "at": 349771,
                    "track": 1100,
                    "sc_name": "865B"
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
                    "sc_name": "866A"
                },
                "toConnection": {
                    "type": "junction",
                    "at": 349839,
                    "track": 2100,
                    "sc_name": "866B"
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
                    "sc_name": "2942A"
                },
                "toConnection": {
                    "type": "junction",
                    "at": 308029,
                    "track": 2100,
                    "sc_name": "2942B"
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
                    "type": "buffer_stop"
                },
                "toConnection": {
                    "type": "buffer_stop"
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
                    "track": 3901
                },
                "toConnection": {
                    "type": "buffer_stop"
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
                    "track": 3903
                },
                "toConnection": {
                    "type": "buffer_stop"
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
                    "track": 3903
                },
                "toConnection": {
                    "type": "buffer_stop"
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
                    "sc_name": "2A"
                },
                "toConnection": {
                    "type": "junction",
                    "at": 294428,
                    "track": 3901
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
                    "track": 3900
                },
                "toConnection": {
                    "type": "junction",
                    "at": 294427,
                    "track": 3903
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
                    "sc_name": "2951A"
                },
                "toConnection": {
                    "type": "junction",
                    "at": 297757,
                    "track": 1100,
                    "sc_name": "2951B"
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
                    "sc_name": "2952"
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
                    "sc_name": "2939A"
                },
                "toConnection": {
                    "type": "junction",
                    "at": 306715,
                    "track": 2100,
                    "sc_name": "2939B"
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
                    "sc_name": "2938"
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
                    "sc_name": "2940"
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
                    "sc_name": "2942A"
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
                    "sc_name": "802"
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
                        "to": 332112,
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
                    "sc_name": "779"
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
                    "sc_name": "778"
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
                    "sc_name": "2282"
                },
                "toConnection": {
                    "type": "junction",
                    "at": 275488,
                    "track": 1100,
                    "sc_name": "2481"
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
                    "sc_name": "2311A"
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
                    "sc_name": "2400"
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
                    "sc_name": "2442B"
                }
            },
            {
                "altRoute": null,
                "tid": 2808,
                "fromConnection": {
                    "type": "junction",
                    "at": 274251,
                    "track": 2200,
                    "sc_name": "2423"
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
                    "sc_name": "2445"
                }
            },
            {
                "tid": 3605,
                "altRoute": null,
                "fromConnection": {
                    "type": "junction",
                    "at": 274285,
                    "track": 2808,
                    "sc_name": "2424"
                },
                "toConnection": {
                    "type": "buffer_stop"
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
                    "type": "buffer_stop"
                },
                "toConnection": {
                    "type": "junction",
                    "at": 274785,
                    "track": 2200,
                    "sc_name": "2448"
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
                    "type": "buffer_stop"
                },
                "toConnection": {
                    "type": "junction",
                    "at": 274718,
                    "track": 3607,
                    "sc_name": "2446B"
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
                    "type": "buffer_stop"
                },
                "toConnection": {
                    "type": "junction",
                    "at": 274750,
                    "track": 3607,
                    "sc_name": "2447"
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
                    "sc_name": "2461A"
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
                    "sc_name": "2445"
                }
            },
            {
                "tid": 3702,
                "altRoute": null,
                "fromConnection": {
                    "type": "junction",
                    "at": 274220,
                    "track": 3301,
                    "sc_name": "2452A"
                },
                "toConnection": {
                    "type": "junction",
                    "at": 274398,
                    "track": 2808,
                    "sc_name": "2426"
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
                    "sc_name": "2413A"
                },
                "toConnection": {
                    "type": "junction",
                    "at": 274216,
                    "track": 3301,
                    "sc_name": "2416B"
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
                    "sc_name": "2442A"
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
                    "sc_name": "1198"
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
                    "sc_name": "1203"
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
                    "sc_name": "1316"
                }
            },
            {
                "tid": 3701,
                "altRoute": null,
                "fromConnection": {
                    "type": "junction",
                    "at": 131866,
                    "track": 1100,
                    "sc_name": "1197A"
                },
                "toConnection": {
                    "type": "junction",
                    "at": 131973,
                    "track": 2100,
                    "sc_name": "1197B"
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
                    "sc_name": "1202A"
                },
                "toConnection": {
                    "type": "junction",
                    "at": 132166,
                    "track": 1100,
                    "sc_name": "1202B"
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
                    "sc_name": "1217A"
                },
                "toConnection": {
                    "type": "junction",
                    "at": 133962,
                    "track": 1100,
                    "sc_name": "1217B"
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
                    "sc_name": "1214A"
                },
                "toConnection": {
                    "type": "junction",
                    "at": 134028,
                    "track": 2200,
                    "sc_name": "1214B"
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
                    "sc_name": "1218"
                },
                "toConnection": {
                    "type": "junction",
                    "at": 134749,
                    "track": 1100,
                    "sc_name": "1243"
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
                    "sc_name": "1219A"
                },
                "toConnection": {
                    "type": "junction",
                    "at": 134095,
                    "track": 1200,
                    "sc_name": "1219B"
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
                    "sc_name": "1242A"
                },
                "toConnection": {
                    "type": "junction",
                    "at": 134711,
                    "track": 1252,
                    "sc_name": "1242B"
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
                    "sc_name": "1216A"
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
                    "sc_name": "1234A"
                },
                "toConnection": {
                    "type": "junction",
                    "at": 134824,
                    "track": 2100,
                    "sc_name": "1234B"
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
                    "sc_name": "1232A"
                },
                "toConnection": {
                    "type": "junction",
                    "at": 134786,
                    "track": 3700,
                    "sc_name": "1233B"
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
                    "sc_name": "1233A"
                },
                "toConnection": {
                    "type": "junction",
                    "at": 134786,
                    "track": 2202,
                    "sc_name": "1232B"
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
                    "sc_name": "1240A"
                },
                "toConnection": {
                    "type": "junction",
                    "at": 134901,
                    "track": 1100,
                    "sc_name": "1240B"
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
                    "sc_name": "1244A"
                },
                "toConnection": {
                    "type": "junction",
                    "at": 135001,
                    "track": 1200,
                    "sc_name": "1244B"
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
                    "sc_name": "1241A"
                },
                "toConnection": {
                    "type": "junction",
                    "at": 135047,
                    "track": 2100,
                    "sc_name": "1241B"
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
                        "to": 138682,
                        "yFrom": 47,
                        "yTo": 47,
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
                        "to": 138682,
                        "yFrom": 48,
                        "yTo": 48,
                        "electrification": "none"
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
                    "elr": "PMJ"
                },
                "toConnection": {
                    "type": "junction",
                    "at": 134995,
                    "track": 2150,
                    "sc_name": "1235B",
                    "elr": "PMJ"
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
                    "elr": "PMJ"
                },
                "toConnection": {
                    "type": "junction",
                    "at": 135110,
                    "track": 1150,
                    "sc_name": "1237B",
                    "elr": "PMJ"
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
                        "to": 16214,
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
                "sideDiagramVisible": true,
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
                    }
                ]
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
                "sideDiagramVisible": true,
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
                    }
                ]
            },
            {
                "sideDiagramVisible": true,
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
                ]
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
            }
        ],
        "altRouteYardageMap": [
            {
                "elr": "PMJ",
                "fromYardageMainRoute": 134672,
                "fromYardageAltRoute": 38833,
                "toYardageMainRoute": 143901,
                "toYardageAltRoute": 29606,
                "showAltRuler": true,
                "_id": "6947cddaef03cff59196f409"
            }
        ]
    }
];
