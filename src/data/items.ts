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
    key: string,
    img: string,
    props: Record<string, string>,
    affordances: AffordanceInfo[],
    capabilities: CapabilityInfo[]

}

type CapabilityInfo = [
    string, CapabilityReaction, string?
]

type AffordanceInfo = [
    string, AffordanceReaction, string?
]


export const items: Item[] = [
    {
        "img": "backpack_blue",
        "props": {
            "color": "blue"
        },
        "key": "backpack",
        "capabilities": [],
        "affordances": [
            [
                "store_small",
                1
            ]
        ]
    },
    {
        "img": "backpack_red",
        "props": {
            "color": "red"
        },
        "key": "backpack",
        "capabilities": [],
        "affordances": [
            [
                "store_small",
                1
            ]
        ]
    },
    {
        "img": "bottle_1",
        "props": {},
        "key": "bottle",
        "capabilities": [
            [
                "store_small",
                0
            ],
            [
                "store_medium",
                0
            ]
        ],
        "affordances": []
    },
    {
        "img": "bottle_2",
        "props": {},
        "key": "bottle",
        "capabilities": [
            [
                "store_small",
                0
            ],
            [
                "store_medium",
                0
            ]
        ],
        "affordances": []
    },
    {
        "img": "car__col__black",
        "props": {
            "color": "black"
        },
        "key": "car",
        "capabilities": [],
        "affordances": [
            [
                "store_medium",
                1
            ],
            [
                "get_in",
                1
            ]
        ]
    },
    {
        "img": "car__col__blue__1",
        "props": {
            "color": "blue"
        },
        "key": "car",
        "capabilities": [],
        "affordances": [
            [
                "store_medium",
                1
            ],
            [
                "get_in",
                1
            ]
        ]
    },
    {
        "img": "car__col__blue__2",
        "props": {
            "color": "blue"
        },
        "key": "car",
        "capabilities": [],
        "affordances": [
            [
                "store_medium",
                1
            ],
            [
                "get_in",
                1
            ]
        ]
    },
    {
        "img": "car__col__blue__3",
        "props": {
            "color": "blue"
        },
        "key": "car",
        "capabilities": [],
        "affordances": [
            [
                "store_medium",
                1
            ],
            [
                "get_in",
                1
            ]
        ]
    },
    {
        "img": "car__col__green",
        "props": {
            "color": "green"
        },
        "key": "car",
        "capabilities": [],
        "affordances": [
            [
                "store_medium",
                1
            ],
            [
                "get_in",
                1
            ]
        ]
    },
    {
        "img": "car__col__orange",
        "props": {
            "color": "orange"
        },
        "key": "car",
        "capabilities": [],
        "affordances": [
            [
                "store_medium",
                1
            ],
            [
                "get_in",
                1
            ]
        ]
    },
    {
        "img": "car__col__pink",
        "props": {
            "color": "pink"
        },
        "key": "car",
        "capabilities": [],
        "affordances": [
            [
                "store_medium",
                1
            ],
            [
                "get_in",
                1
            ]
        ]
    },
    {
        "img": "car__col__purple",
        "props": {
            "color": "purple"
        },
        "key": "car",
        "capabilities": [],
        "affordances": [
            [
                "store_medium",
                1
            ],
            [
                "get_in",
                1
            ]
        ]
    },
    {
        "img": "car__col__red",
        "props": {
            "color": "red"
        },
        "key": "car",
        "capabilities": [],
        "affordances": [
            [
                "store_medium",
                1
            ],
            [
                "get_in",
                1
            ]
        ]
    },
    {
        "img": "car__col__red__2",
        "props": {
            "color": "red"
        },
        "key": "car",
        "capabilities": [],
        "affordances": [
            [
                "store_medium",
                1
            ],
            [
                "get_in",
                1
            ]
        ]
    },
    {
        "img": "car__col__red__3",
        "props": {
            "color": "red"
        },
        "key": "car",
        "capabilities": [],
        "affordances": [
            [
                "store_medium",
                1
            ],
            [
                "get_in",
                1
            ]
        ]
    },
    {
        "img": "car__col__silver",
        "props": {
            "color": "silver"
        },
        "key": "car",
        "capabilities": [],
        "affordances": [
            [
                "store_medium",
                1
            ],
            [
                "get_in",
                1
            ]
        ]
    },
    {
        "img": "car__col__silver__2",
        "props": {
            "color": "silver"
        },
        "key": "car",
        "capabilities": [],
        "affordances": [
            [
                "store_medium",
                1
            ],
            [
                "get_in",
                1
            ]
        ]
    },
    {
        "img": "car__col__silver__3",
        "props": {
            "color": "silver"
        },
        "key": "car",
        "capabilities": [],
        "affordances": [
            [
                "store_medium",
                1
            ],
            [
                "get_in",
                1
            ]
        ]
    },
    {
        "img": "car__col__white",
        "props": {
            "color": "white"
        },
        "key": "car",
        "capabilities": [],
        "affordances": [
            [
                "store_medium",
                1
            ],
            [
                "get_in",
                1
            ]
        ]
    },
    {
        "img": "car__col__yellow__age__new",
        "props": {
            "color": "yellow",
            "age": "new"
        },
        "key": "car",
        "capabilities": [],
        "affordances": [
            [
                "store_medium",
                1
            ],
            [
                "get_in",
                1
            ]
        ]
    },
    {
        "img": "car__col__yellow__age__old",
        "props": {
            "color": "yellow",
            "age": "old"
        },
        "key": "car",
        "capabilities": [],
        "affordances": [
            [
                "store_medium",
                1
            ],
            [
                "get_in",
                1
            ]
        ]
    },
    {
        "img": "dog",
        "props": {
            "size": "big"
        },
        "key": "dog",
        "capabilities": [
            [
                "store_medium",
                0
            ]
        ],
        "affordances": []
    },
    {
        "img": "dog_small",
        "props": {
            "size": "small"
        },
        "key": "dog",
        "capabilities": [
            [
                "store_medium",
                0
            ]
        ],
        "affordances": []
    },
    {
        "img": "notebook",
        "props": {},
        "key": "notebook",
        "capabilities": [
            [
                "store_small",
                0
            ],
            [
                "store_medium",
                0
            ]
        ],
        "affordances": []
    },
    {
        "img": "shirt",
        "props": {},
        "key": "shirt",
        "capabilities": [
            [
                "store_small",
                0
            ],
            [
                "store_medium",
                0
            ]
        ],
        "affordances": []
    },
    {
        "img": "shoes",
        "props": {},
        "key": "shoes",
        "capabilities": [
            [
                "store_small",
                0
            ],
            [
                "store_medium",
                0
            ]
        ],
        "affordances": []
    },
    {
        "img": "you",
        "props": {},
        "key": "you",
        "capabilities": [
            [
                "get_in",
                0
            ]
        ],
        "affordances": []
    }
]