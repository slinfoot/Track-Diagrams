const routes = [
    {
        name: "East Coast Main Line",
        code: "ECML",
        length_yards: 595826,
        sections: [
            { from: 0, to: 281952, elr: "ECM1", offset: 0 },
            { from: 281952, to: 298320, elr: "ECM2", offset: 0 },
            { from: 298320, to: 322960, elr: "ECM3", offset: 0 },
            { from: 322960, to: 331760, elr: "ECM4", offset: 0 },
            { from: 331760, to: 472670, elr: "ECM5", offset: 331760 },
            { from: 472670, to: 472912, elr: "ECM6", offset: 331760 },
            { from: 472912, to: 595826, elr: "ECM7", offset: 472912 },
        ],
        tracks: [
            {
                tid: 3600,
                fromConnection: { type: "buffer_stop" },
                toConnection: { type: "junction", at: 459, track: 3101, sc_name: "5041" },
                shape: [
                    { from: 35, to: 349, yFrom: 55, yTo: 55 },
                    { from: 349, to: 459, yFrom: 55, yTo: 52 }
                ]
            },
            {
                tid: 3601,
                fromConnection: { type: "buffer_stop" },
                toConnection: { type: "junction", at: 459, track: 3101, sc_name: "5041" },
                shape: [
                    { from: 22, to: 329, yFrom: 54, yTo: 54 },
                    { from: 329, to: 459, yFrom: 54, yTo: 52 }
                ]
            },
            {
                tid: 3706,
                fromConnection: { type: "junction", at: 359, track: 3601, sc_name: "5006A" },
                toConnection: { type: "junction", at: 419, track: 3102, sc_name: "5006B" },
                shape: [
                    { from: 359, to: 419, yFrom: null, yTo: null }
                ]
            },
            {
                tid: 3602,
                fromConnection: { type: "buffer_stop" },
                toConnection: { type: "junction", at: 419, track: 3102, sc_name: "5006B" },
                shape: [
                    { from: 20, to: 329, yFrom: 53, yTo: 53 },
                    { from: 329, to: 419, yFrom: 53, yTo: 51 }
                ]
            },
            {
                tid: 3700,
                fromConnection: { type: "junction", at: 355, track: 3602, sc_name: "5000" },
                toConnection: { type: "junction", at: 431, track: 3603, sc_name: "5038" },
                shape: [
                    { from: 355, to: 431, yFrom: null, yTo: null }
                ]
            },
            {
                tid: 3603,
                fromConnection: { type: "buffer_stop" },
                toConnection: { type: "junction", at: 469, track: 3103, sc_name: "5058" },
                shape: [
                    { from: 22, to: 329, yFrom: 52, yTo: 52 },
                    { from: 329, to: 469, yFrom: 52, yTo: 50 }
                ]
            },
            {
                tid: 3604,
                fromConnection: { type: "buffer_stop" },
                toConnection: { type: "junction", at: 428, track: 3105, sc_name: "5035" },
                shape: [
                    { from: 22, to: 349, yFrom: 51, yTo: 51 },
                    { from: 349, to: 428, yFrom: 51, yTo: 50 }
                ]
            },
            {
                tid: 3605,
                fromConnection: { type: "buffer_stop" },
                toConnection: { type: "junction", at: 469, track: 3103, sc_name: "5058" },
                shape: [
                    { from: 33, to: 469, yFrom: 50, yTo: 50 }
                ]
            },
            {
                tid: 3712,
                fromConnection: { type: "junction", at: 359, track: 3605, sc_name: "5012A" },
                toConnection: { type: "junction", at: 424, track: 3606, sc_name: "5012B" },
                shape: [
                    { from: 359, to: 424, yFrom: null, yTo: null }
                ]
            },
            {
                tid: 3606,
                fromConnection: { type: "buffer_stop" },
                toConnection: { type: "junction", at: 461, track: 3104, sc_name: "5052" },
                shape: [
                    { from: 33, to: 461, yFrom: 49, yTo: 49 }
                ]
            },
            {
                tid: 3718,
                fromConnection: { type: "junction", at: 359, track: 3607, sc_name: "5018" },
                toConnection: { type: "junction", at: 461, track: 3104, sc_name: "5052" },
                shape: [
                    { from: 359, to: 461, yFrom: null, yTo: null }
                ]
            },
            {
                tid: 3607,
                fromConnection: { type: "buffer_stop" },
                toConnection: { type: "junction", at: 450, track: 3105, sc_name: "5024B" },
                shape: [
                    { from: 32, to: 450, yFrom: 48, yTo: 48 }
                ]
            },
            {
                tid: 3724,
                fromConnection: { type: "junction", at: 387, track: 3608, sc_name: "5024A" },
                toConnection: { type: "junction", at: 450, track: 3105, sc_name: "5024B" },
                shape: [
                    { from: 387, to: 450, yFrom: null, yTo: null }
                ]
            },
            {
                tid: 3608,
                fromConnection: { type: "buffer_stop" },
                toConnection: { type: "junction", at: 461, track: 3106, sc_name: "5047" },
                shape: [
                    { from: 32, to: 461, yFrom: 47, yTo: 47 }
                ]
            },
            {
                tid: 3609,
                fromConnection: { type: "buffer_stop" },
                toConnection: { type: "junction", at: 410, track: 3610, sc_name: "5029" },
                shape: [
                    { from: 158, to: 410, yFrom: 46, yTo: 46 }
                ]
            },
            {
                tid: 3610,
                fromConnection: { type: "buffer_stop" },
                toConnection: { type: "junction", at: 461, track: 3106, sc_name: "5047" },
                shape: [
                    { from: 162, to: 380, yFrom: 45, yTo: 45 },
                    { from: 380, to: 410, yFrom: 45, yTo: 46 },
                    { from: 410, to: 461, yFrom: 46, yTo: 47 }
                ]
            },
            {
                tid: 3101,
                shape: [
                    { from: 459, to: 884, yFrom: 52, yTo: 52 }
                ]
            },
            {
                tid: 3775,
                fromConnection: { type: "junction", at: 884, track: 3101, sc_name: "5075A" },
                toConnection: { type: "junction", at: 994, track: 3102, sc_name: "5075B" },
                shape: [
                    { from: 884, to: 994, yFrom: null, yTo: null }
                ]
            },
            {
                tid: 3102,
                shape: [
                    { from: 419, to: 449, yFrom: 52, yTo: 51 },
                    { from: 449, to: 1100, yFrom: 51, yTo: 51 },
                    { from: 1100, to: 1208, yFrom: 51, yTo: 50 }
                ]
            },
            {
                tid: 3103,
                shape: [
                    { from: 469, to: 1253, yFrom: 50, yTo: 50 }
                ]
            },
            {
                tid: 3763,
                fromConnection: { type: "junction", at: 598, track: 3103, sc_name: "5063A" },
                toConnection: { type: "junction", at: 742, track: 3104, sc_name: "5063B" },
                shape: [
                    { from: 598, to: 742, yFrom: null, yTo: null }
                ]
            },
            {
                tid: 3781,
                fromConnection: { type: "junction", at: 881, track: 3104, sc_name: "5081A" },
                toConnection: { type: "junction", at: 990, track: 3103, sc_name: "5081B" },
                shape: [
                    { from: 881, to: 990, yFrom: null, yTo: null }
                ]
            },
            {
                tid: 3104,
                shape: [
                    { from: 461, to: 1664, yFrom: 49, yTo: 49 }
                ]
            },
            {
                tid: 3786,
                fromConnection: { type: "junction", at: 1019, track: 3105, sc_name: "5086" },
                toConnection: { type: "junction", at: 1208, track: 3104, sc_name: "5097" },
                shape: [
                    { from: 1019, to: 1208, yFrom: null, yTo: null }
                ]
            },
            {
                tid: 3105,
                shape: [
                    { from: 450, to: 1285, yFrom: 48, yTo: 48 }
                ]
            },
            {
                tid: 3770,
                fromConnection: { type: "junction", at: 587, track: 3106, sc_name: "5070A" },
                toConnection: { type: "junction", at: 687, track: 3105, sc_name: "5070B" },
                shape: [
                    { from: 587, to: 687, yFrom: null, yTo: null }
                ]
            },
            {
                tid: 3106,
                shape: [
                    { from: 461, to: 1456, yFrom: 47, yTo: 47 }
                ]
            },
            {
                tid: 1101,
                fromConnection: { type: "fixed" },
                toConnection: { type: "junction", at: 141, track: 1100, sc_name: "5119" },
                shape: [
                    { from: 884, to: 1300, yFrom: 52, yTo: 52 },
                    { from: 1300, to: 1414, yFrom: 52, yTo: 50 }
                ]
            },
            {
                tid: 1100,
                shape: [
                    { from: 1253, to: 331760, yFrom: 50, yTo: 50 }
                ]
            },
            {
                tid: 3704,
                fromConnection: { type: "junction", at: 1253, track: 1100 },
                toConnection: { type: "junction", at: 1375, track: 3104 },
                shape: [
                    { from: 1253, to: 1375, yFrom: null, yTo: null }
                ]
            },
            {
                tid: 1200,
                shape: [
                    { from: 1285, to: 2030, yFrom: 48, yTo: 48 },
                    { from: 2030, to: 2245, yFrom: 48, yTo: 51 },
                    { from: 2245, to: 104262, yFrom: 51, yTo: 51 }
                ]
            },
            {
                tid: 2713,
                fromConnection: { type: "junction", at: 1285, track: 1200 },
                toConnection: { type: "junction", at: 1377, track: 3106 },
                shape: [
                    { from: 1285, to: 1377, yFrom: null, yTo: null }
                ]
            },
            {
                tid: 2200,
                shape: [
                    { from: 1456, to: 2200, yFrom: 47, yTo: 47 },
                    { from: 2200, to: 2290, yFrom: 47, yTo: 48 },
                    { from: 2290, to: 134187, yFrom: 48, yTo: 48 }
                ]
            },
            {
                tid: 1730,
                fromConnection: { type: "junction", at: 1456, track: 2200 },
                toConnection: { type: "junction", at: 1563, track: 1200 },
                shape: [
                    { from: 1456, to: 1563, yFrom: null, yTo: null }
                ]
            },
            {
                tid: 1734,
                fromConnection: { type: "junction", at: 1664, track: 2100 },
                toConnection: { type: "junction", at: 1751, track: 1100 },
                shape: [
                    { from: 1664, to: 1751, yFrom: null, yTo: null }
                ]
            },
            {
                tid: 2100,
                shape: [
                    { from: 1664, to: 331760, yFrom: 49, yTo: 49 }
                ]
            },
            {
                tid: 3700,
                fromConnection: { type: "junction", at: 2514, track: 2100 },
                toConnection: { type: "junction", at: 2673, track: 2200 },
                shape: [
                    { from: 2514, to: 2673, yFrom: null, yTo: null }
                ]
            },
            {
                tid: 3701,
                fromConnection: { type: "junction", at: 2619, track: 1100 },
                toConnection: { type: "junction", at: 2718, track: 1200 },
                shape: [
                    { from: 2619, to: 2718, yFrom: null, yTo: null }
                ]
            },
            {
                tid: 3700,
                fromConnection: { type: "junction", at: 2743, track: 1200 },
                toConnection: { type: "junction", at: 2888, track: 1100 },
                shape: [
                    { from: 2743, to: 2888, yFrom: null, yTo: null }
                ]
            },
            {
                tid: 3700,
                fromConnection: { type: "junction", at: 3014, track: 2200 },
                toConnection: { type: "junction", at: 3165, track: 2100 },
                shape: [
                    { from: 3014, to: 3165, yFrom: null, yTo: null }
                ]
            },
            {
                tid: 2300,
                fromConnection: { type: "junction", at: 3155, track: 2200 },
                toConnection: { type: "fixed", at: null },
                shape: [
                    { from: 3155, to: 3200, yFrom: 48, yTo: 47 },
                    { from: 3200, to: 3508, yFrom: 47, yTo: 47 },
                    { from: 3508, to: 3740, yFrom: 47, yTo: 45 },
                    { from: 3740, to: 4100, yFrom: 45, yTo: 45 },
                    { from: 4100, to: 4140, yFrom: 45, yTo: 46 },
                    { from: 4140, to: 4787, yFrom: 46, yTo: 46 },
                ]
            },
            {
                tid: 3300,
                altRoute: { elr: "CRF1" },
                toConnection: { type: "junction", at: 1424, track: 3106 },
                shape: [
                    { from: 1300, to: 1424, yFrom: 44, yTo: null }
                ]
            },
            {
                tid: 1100,
                altRoute: { elr: "CBI" },
                fromConnection: { type: "junction", at: 1227, track: 3106 },
                toConnection: { type: "junction", at: 1278, track: 3105 },
                shape: [
                    { from: 1227, to: 1278, yFrom: null, yTo: null }
                ]
            },
            {
                tid: 1100,
                altRoute: { elr: "CBI" },
                toConnection: { type: "junction", at: 1227, track: 3106 },
                shape: [
                    { from: 1100, to: 1227, yFrom: 46, yTo: null }
                ]
            },
            {
                tid: 2100,
                altRoute: { elr: "CBI" },
                toConnection: { type: "junction", at: 1279, track: 3106 },
                shape: [
                    { from: 1100, to: 1279, yFrom: 45, yTo: null }
                ]
            },
            {
                tid: 3700,
                fromConnection: { type: "junction", at: 3286, track: 1100 },
                toConnection: { type: "junction", at: 3420, track: 1200 },
                shape: [
                    { from: 3286, to: 3420, yFrom: null, yTo: null }
                ]
            },
            {
                tid: 1202,
                fromConnection: { type: "junction", at: 3309, track: 1200 },
                shape: [
                    { from: 3309, to: 3400, yFrom: null, yTo: 52 },
                    { from: 3400, to: 3666, yFrom: 52, yTo: 52 },
                    { from: 3666, to: 3819, yFrom: 52, yTo: 54 },
                    { from: 3819, to: 4270, yFrom: 54, yTo: 54 },
                    { from: 4270, to: 4320, yFrom: 54, yTo: 52 },
                    { from: 4320, to: 8921, yFrom: 52, yTo: 52 }
                ]
            },
            {
                tid: 2101,
                toConnection: { type: "junction", at: 5032, track: 2200 },
                shape: [
                    { from: 4235, to: 4990, yFrom: 47, yTo: 47 },
                    { from: 4990, to: 5032, yFrom: 47, yTo: 48 }
                ]
            },
            {
                tid: 3700,
                fromConnection: { type: "junction", at: 4705, track: 2101 },
                toConnection: { type: "junction", at: 4787, track: 2252 },
                shape: [
                    { from: 4705, to: 4787, yFrom: null, yTo: null }
                ]
            },
            {
                tid: 2252,
                shape: [
                    { from: 4787, to: 5060, yFrom: 46, yTo: 46 },
                    { from: 5060, to: 5100, yFrom: 46, yTo: 47 },
                    { from: 5100, to: 6358, yFrom: 47, yTo: 47 },
                    { from: 6358, to: 6420, yFrom: 47, yTo: 45 },
                    { from: 6420, to: 7216, yFrom: 45, yTo: 45 },
                    { from: 7216, to: 7260, yFrom: 45, yTo: 47 },
                    { from: 7260, to: 8640, yFrom: 47, yTo: 47 }
                ]
            },
            {
                tid: 3703,
                fromConnection: { type: "junction", at: 4821, track: 2252 },
                toConnection: { type: "junction", at: 4888, track: 2101 },
                shape: [
                    { from: 4821, to: 4888, yFrom: null, yTo: null }
                ]
            },
            {
                tid: 3702,
                fromConnection: { type: "junction", at: 4810, track: 2200 },
                toConnection: { type: "junction", at: 4933, track: 2100 },
                shape: [
                    { from: 4810, to: 4933, yFrom: null, yTo: null }
                ]
            },
            {
                tid: 3701,
                fromConnection: { type: "junction", at: 4605, track: 2200 },
                toConnection: { type: "junction", at: 4680, track: 2101 },
                shape: [
                    { from: 4605, to: 4680, yFrom: null, yTo: null }
                ]
            },
            {
                tid: 3795,
                fromConnection: { type: "junction", at: 4656, track: 1100 },
                toConnection: { type: "junction", at: 4719, track: 2100 },
                shape: [
                    { from: 4656, to: 4719, yFrom: null, yTo: null }
                ]
            },
            {
                tid: 3701,
                fromConnection: { type: "junction", at: 4829, track: 1200 },
                toConnection: { type: "junction", at: 4933, track: 1100 },
                shape: [
                    { from: 4829, to: 4933, yFrom: null, yTo: null }
                ]
            },
            {
                tid: 3700,
                fromConnection: { type: "junction", at: 4865, track: 1202 },
                toConnection: { type: "junction", at: 4943, track: 1200 },
                shape: [
                    { from: 4865, to: 4943, yFrom: null, yTo: null }
                ]
            },
            {
                tid: 2100,
                altRoute: { elr: "MEB1" },
                shape: [
                    { from: 3740, to: 4235, yFrom: 47, yTo: 47 }
                ]
            },
            {
                tid: 2100,
                altRoute: { elr: "CFP" },
                shape: [
                    { from: 3740, to: 4140, yFrom: 46, yTo: 46 }
                ]
            },
            {
                tid: 3700,
                altRoute: { elr: "CFP" },
                shape: [
                    { from: 3750, to: 3840, yFrom: 46, yTo: 45 }
                ]
            },
            {
                tid: 3702,
                fromConnection: { type: "junction", at: 4162, track: 2300 },
                toConnection: { type: "junction", at: 4235, track: 2101 },
                shape: [
                    { from: 4162, to: 4235, yFrom: 46, yTo: 45 }
                ]
            },
            {
                tid: 3701,

                toConnection: { type: "junction", at: 4203, track: 2200 },
                shape: [
                    { from: 4106, to: 4203, yFrom: 47, yTo: 48 }
                ]
            },
            {
                tid: 1100,
                altRoute: { elr: "MEB1" },
                toConnection: { type: "junction", at: 4312, track: 1200, elr: "ECM1" },
                shape: [
                    { from: 3784, to: 4250, yFrom: 52, yTo: 52 },
                    { from: 4250, to: 4312, yFrom: 52, yTo: null }
                ]
            },
            {
                tid: 1100,
                altRoute: { elr: "CFP" },
                toConnection: { type: "junction", at: 4244, track: 1100, elr: "MEB1" },
                shape: [
                    { from: 3784, to: 4220, yFrom: 53, yTo: 53 },
                    { from: 4220, to: 4244, yFrom: 53, yTo: null }
                ]
            },
            {
                tid: 3700,
                fromConnection: { type: "junction", at: 4147, track: 1100, elr: "CFP" },
                toConnection: { type: "junction", at: 4226, track: 1202 },
                shape: [
                    { from: 4147, to: 4226, yFrom: null, yTo: null }
                ]
            },
            {
                tid: 3700,
                altRoute: { elr: "CFP" },
                fromConnection: { type: "junction", at: 3864, track: 1100, elr: "MEB1" },
                toConnection: { type: "junction", at: 3994, track: 1100, elr: "CFP" },
                shape: [
                    { from: 3864, to: 3994, yFrom: null, yTo: null }
                ]
            },
            {
                tid: 3802,
                fromConnection: { type: "buffer", at: 5362},
                shape: [
                    { from: 5362, to: 6312, yFrom: 53, yTo: 53 }
                ]
            },
            {
                tid: 3700,
                fromConnection: { type: "junction", at: 5741, track: 1200, sc_name: "2102A" },
                toConnection: { type: "junction", at: 5811, track: 1202, sc_name: "2102B" },
                shape: [
                    { from: 5741, to: 5811, yFrom: null, yTo: null }
                ]
            },
            {
                tid: 3701,
                fromConnection: { type: "junction", at: 5741, track: 1202, sc_name: "2103A" },
                toConnection: { type: "junction", at: 5810, track: 3802, sc_name: "2103B" },
                shape: [
                    { from: 5741, to: 5810, yFrom: null, yTo: null }
                ]
            },
            {
                tid: 3700,
                fromConnection: { type: "junction", at: 5824, track: 1202, sc_name: "2103A" },
                toConnection: { type: "junction", at: 5894, track: 3802, sc_name: "2103B" },
                shape: [
                    { from: 5824, to: 5894, yFrom: null, yTo: null }
                ]
            },
            {
                tid: 3801,
                fromConnection: { type: "junction", at: 5823, track: 5966, sc_name: "2104" },
                shape: [
                    { from: 5823, to: 5865, yFrom: 53, yTo: 54 },
                    { from: 5865, to: 6000, yFrom: 54, yTo: 54 },
                    { from: 6000, to: 6040, yFrom: 54, yTo: 55 },
                    { from: 6040, to: 6273, yFrom: 55, yTo: 55 }
                ]
            },
            {
                tid: 3701,
                fromConnection: { type: "junction", at: 5904, track: 3802, sc_name: "2107A" },
                toConnection: { type: "junction", at: 5966, track: 3801, sc_name: "2107B" },
                shape: [
                    { from: 5904, to: 5966, yFrom: null, yTo: null }
                ]
            },
            {
                tid: 3700,
                fromConnection: { type: "junction", at: 5948, track: 3802, sc_name: "2108A" },
                toConnection: { type: "junction", at: 6031, track: 1202, sc_name: "2108B" },
                shape: [
                    { from: 5948, to: 6031, yFrom: null, yTo: null }
                ]
            },
            {
                tid: 3800,
                fromConnection: { type: "junction", at: 5969, track: 3801, sc_name: "2109" },
                shape: [
                    { from: 5969, to: 6050, yFrom: null, yTo: 56 },
                    { from: 6050, to: 6192, yFrom: 56, yTo: 56 },
                    { from: 6192, to: 6406, yFrom: 56, yTo: 47 },
                    { from: 6406, to: 6620, yFrom: 47, yTo: 47 },
                    { from: 6620, to: 6660, yFrom: 47, yTo: 46 },
                    { from: 6660, to: 6790, yFrom: 46, yTo: 46 },
                   
                ]
            },
            {
                tid: 3901,
                altRoute: { elr: "HDS" },
                shape: [
                    { from: 6312, to: 8216, yFrom: 53, yTo: 53 }
                ]
            },
            {
                tid: 3701,
                fromConnection: { type: "junction", at: 6661, track: 2252, sc_name: "2119A" },
                toConnection: { type: "junction", at: 6731, track: 3800, sc_name: "2119B" },
                shape: [
                    { from: 6661, to: 6731, yFrom: 53, yTo: 53 }
                ]
            },
            {
                tid: 3701,
                fromConnection: { type: "junction", at: 6734, track: 3800, sc_name: "2121A" },
                toConnection: { type: "junction", at: 6812, track: 2252, sc_name: "2121B" },
                shape: [
                    { from: 6734, to: 6812, yFrom: 53, yTo: 53 }
                ]
            },
            {
                tid: 3901,
                fromConnection: { type: "junction", at: 6620, track: 3800, sc_name: "2117" },
                toConnection: { type: "buffer" },
                shape: [
                    { from: 6620, to: 7027, yFrom: null, yTo: 47 }
                ]
            },
            {
                tid: 3718,
                fromConnection: { type: "junction", at: 6626, track: 2200, sc_name: "2118A" },
                toConnection: { type: "junction", at: 6728, track: 3901, sc_name: "2118B" },
                shape: [
                    { from: 6626, to: 6728, yFrom: null, yTo: null }
                ]
            },
            {
                tid: 3722,
                fromConnection: { type: "junction", at: 6765, track: 3901, sc_name: "2122A" },
                toConnection: { type: "junction", at: 6846, track: 2200, sc_name: "2122B" },
                shape: [
                    { from: 6765, to: 6846, yFrom: null, yTo: null }
                ]
            },
            {
                tid: 3900,
                fromConnection: { type: "junction", at: 6790, track: 3800, sc_name: "2117" },
                toConnection: { type: "buffer" },
                shape: [
                    { from: 6790, to: 7163, yFrom: null, yTo: 46 }
                ]
            },
            {
                tid: 3700,
                fromConnection: { type: "junction", at: 6790, track: 3900, sc_name: "2123A" },
                toConnection: { type: "junction", at: 6842, track: 3901, sc_name: "2123B" },
                shape: [
                    { from: 6790, to: 6842, yFrom: null, yTo: null }
                ]
            },
            {
                tid: 3700,
                fromConnection: { type: "junction", at: 6731, track: 3901, sc_name: "2120A" },
                toConnection: { type: "junction", at: 6778, track: 3800, sc_name: "2120B" },
                shape: [
                    { from: 6731, to: 6778, yFrom: null, yTo: null }
                ]
            },
            

        ],
        stations: [
            {
                name: "Kings Cross",
                at: 220,
                platforms: [
                    { track: 3600, platformNo: 0, from: 0, to: 330, position: "above" },
                    { track: 3601, platformNo: 1, from: 0, to: 330, position: "below" },
                    { track: 3602, platformNo: 2, from: 0, to: 308, position: "above" },
                    { track: 3603, platformNo: 3, from: 0, to: 308, position: "below" },
                    { track: 3604, platformNo: 4, from: 0, to: 286, position: "above" },
                    { track: 3605, platformNo: 5, from: 0, to: 286, position: "below" },
                    { track: 3606, platformNo: 6, from: 0, to: 308, position: "above" },
                    { track: 3607, platformNo: 7, from: 0, to: 308, position: "below" },
                    { track: 3608, platformNo: 8, from: 0, to: 308, position: "above" },
                    { track: 3609, platformNo: 9, from: 154, to: 308, position: "below" },
                    { track: 3610, platformNo: 10, from: 154, to: 308, position: "below" },
                ]
            },
            {
                name: "Finsbury Park",
                at: 4444,
                platforms: [
                    { track: 1202, platformNo: 1, from: 4356, to: 4598, position: "above" },
                    { track: 1200, platformNo: 2, from: 4334, to: 4598, position: "below" },
                    { track: 1200, platformNo: 3, from: 4334, to: 4642, position: "above" },
                    { track: 1100, platformNo: 4, from: 4334, to: 4598, position: "below" },
                    { track: 2100, platformNo: 5, from: 4334, to: 4598, position: "above" },
                    { track: 2200, platformNo: 6, from: 4312, to: 4510, position: "below" },
                    { track: 2200, platformNo: 7, from: 4312, to: 4598, position: "above" },
                    { track: 2101, platformNo: 8, from: 4312, to: 4510, position: "below" },
                ]
            },
            {
                name: "Harringay",
                at: 5984,
                platforms: [
                    { track: 1200, platformNo: 1, from: 5918, to: 6072, position: "below" },
                    { track: 2200, platformNo: 2, from: 5918, to: 6072, position: "below" }
                ]
            },
            {
                name: "Hornsey",
                at: 7128,
                platforms: [
                    { track: 1200, platformNo: 1, from: 7070, to: 7194, position: "above" },
                    { track: 2200, platformNo: 2, from: 7040, to: 7194, position: "above" }
                ]
            },
            {
                name: "Alexandra Palace",
                at: 8778,
                platforms: [
                    { track: 1202, platformNo: 1, from: 8690, to: 8844, position: "below" },
                    { track: 1200, platformNo: 2, from: 8690, to: 8844, position: "above" },
                    { track: 2200, platformNo: 3, from: 8646, to: 8844, position: "above" }
                ]
            }
        ],
        structures: [
            {
                name: "Gas Works Tunnel West Bore",
                type: "tunnel",
                structureNo: "ECM1-4",
                trackLocation: [
                    { from: 484, to: 1012, tid: 3106 },
                    { from: 484, to: 1012, tid: 3105 }
                ]
            },
            {
                name: "Gas Works Tunnel Center Bore",
                type: "tunnel",
                structureNo: "ECM1-4",
                trackLocation: [
                    { from: 484, to: 1012, tid: 3104 },
                    { from: 484, to: 1012, tid: 3103 }
                ]
            },
            {
                name: "Gas Works Tunnel East Bore",
                type: "tunnel",
                structureNo: "ECM1-4",
                trackLocation: [
                    { from: 484, to: 1012, tid: 3102 },
                    { from: 484, to: 1012, tid: 3101 }
                ]
            },
            {
                name: "Copenhagen Tunnel West Bore",
                type: "tunnel",
                structureNo: "ECM1-6",
                trackLocation: [
                    { from: 1430, to: 2024, tid: 2200 },
                    { from: 1430, to: 2024, tid: 1200 }
                ]
            },
            {
                name: "Copenhagen Tunnel Center Bore",
                type: "tunnel",
                structureNo: "ECM1-6",
                trackLocation: [
                    { from: 1430, to: 2024, tid: 2100 },
                    { from: 1430, to: 2024, tid: 1100 }
                ]
            },
            ,
            {
                name: "Holloway Flyover",
                type: "viaduct",
                structureNo: "ECM1-7",
                trackLocation: [
                    { from: 2046, to: 2244, tid: 1200 }
                ]
            },
            {
                name: "Intersection Bridge",
                type: "underbridge",
                structureNo: "ECM1-12",
                trackLocation: [
                    { from: 3630, to: 3696, tid: 2200 },
                    { from: 3454, to: 3520, tid: 1202 }
                ]
            },
            {
                name: "Intersection Bridge",
                type: "underbridge",
                structureNo: "ECM1-12B",
                trackLocation: [
                    { from: 3696, to: 3784, tid: 1202 }
                ]
            },
            {
                name: "Harringay Flyover",
                type: "viaduct",
                structureNo: "ECM1-23",
                trackLocation: [
                    { from: 6195, to: 6402, tid: 3800 }
                ]
            },
        ]
    },
];