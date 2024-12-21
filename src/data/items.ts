export enum CapabilityReaction {
    Disappear,
    Return
}

export enum AffordanceReaction {
    Disappear,
    DoNothing,
    ChangeTo,
    AddImage
}


export type Item = {
    id: string,
    affordances?: AffordanceInfo[],
    capabilities?: CapabilityInfo[]

}

type CapabilityInfo = [
    string, CapabilityReaction, string?
]

type AffordanceInfo = [
    string, AffordanceReaction, string?
]


export const items: Item[] = [
    {
        "id": "bowl",
        "affordances": [
            [
                "put_in",
                3
            ]
        ]
    },
    {
        "id": "knife",
        "capabilities": [
            [
                "cut",
                1
            ]
        ]
    },
    {
        "id": "apple",
        "affordances": [
            [
                "cut",
                2,
                "apple_half"
            ],
            [
                "put_in",
                0
            ]
        ]
    },
    {
        "id": "apple_half",
        "affordances": [
            [
                "put_in",
                0
            ]
        ]
    },
    {
        "id": "avocado",
        "affordances": [
            [
                "cut",
                2,
                "avocado_cut"
            ],
            [
                "put_in",
                0
            ]
        ]
    },
    {
        "id": "avocado_cut",
        "affordances": [
            [
                "put_in",
                0
            ]
        ]
    },
    {
        "id": "broccoli",
        "affordances": [
            [
                "cut",
                2,
                "broccoli_half"
            ],
            [
                "put_in",
                0
            ]
        ]
    },
    {
        "id": "broccoli_half",
        "affordances": [
            [
                "put_in",
                0
            ]
        ]
    },
    {
        "id": "honeymelon",
        "affordances": [
            [
                "cut",
                2,
                "honeymelon_cut"
            ],
            [
                "put_in",
                0
            ]
        ]
    },
    {
        "id": "honeymelon_cut",
        "affordances": [
            [
                "put_in",
                0
            ]
        ]
    },
    {
        "id": "kiwi",
        "affordances": [
            [
                "cut",
                2,
                "kiwi_cut"
            ],
            [
                "put_in",
                0
            ]
        ]
    },
    {
        "id": "kiwi_cut",
        "affordances": [
            [
                "put_in",
                0
            ]
        ]
    },
    {
        "id": "lemon",
        "affordances": [
            [
                "cut",
                2,
                "lemon_cut"
            ],
            [
                "put_in",
                0
            ]
        ]
    },
    {
        "id": "lemon_cut",
        "affordances": [
            [
                "put_in",
                0
            ]
        ]
    },
    {
        "id": "mango",
        "affordances": [
            [
                "cut",
                2,
                "mango_cut"
            ],
            [
                "put_in",
                0
            ]
        ]
    },
    {
        "id": "mango_cut",
        "affordances": [
            [
                "put_in",
                0
            ]
        ]
    },
    {
        "id": "melon_whole",
        "affordances": [
            [
                "cut",
                2,
                "melon_cut"
            ],
            [
                "put_in",
                0
            ]
        ]
    },
    {
        "id": "melon_cut",
        "affordances": [
            [
                "put_in",
                0
            ]
        ]
    },
    {
        "id": "onion",
        "affordances": [
            [
                "cut",
                2,
                "onion_cut"
            ],
            [
                "put_in",
                0
            ]
        ]
    },
    {
        "id": "onion_cut",
        "affordances": [
            [
                "put_in",
                0
            ]
        ]
    }
]

