// Basic Timetable information.
var timetableversion = "3.21.1"

// Timetable class fetch folder
// Timetable will require a <classno>.json file in the folder
// to be exact, for example 305.json, 306.json
var classdatafetchpath = `/timetable/assets/js/config/classinfo/2_2024`

// Copyright year settings
var fetchcopyrightyear = true
var copyrightyear = "2023"

// Elective classe (Is disabled in custom classes, since the user 
// would put their data in by themselves, not requiring the feature.)
var elective_toggle = true
var elective_primary = "Chinese"
var elective_secondary = "Japanese"

// - You can add custom timelist in classtimes variable, define it, 
//   and then put the time list into action with classtype_type.
// - This is default time list, except for user who override this information in settings.
var classtime_type = "Regular"
var classtimes = {
    "Regular": {
        "notify": false,
        "list": [
            "08:00 — 08:30",
            "08:30 — 09:20",
            "09:20 — 10:10",
            "10:10 — 11:00",
            "11:00 — 11:50",
            "11:50 — 12:40",
            "12:40 — 13:30",
            "13:30 — 14:20",
            "14:20 — 15:10",
            "15:10 — 16:00",
            "16:00 — 16:50"
        ],
        "timeremaining": {
            "periodperday": 10,
            "periodlength": 50,
            "starthour": 7,
            "startmin": 40,
        }
    },
    "Special": {
        "notify": true,
        "list": [
            "08:00 — 08:30",
            "08:30 — 09:10",
            "09:10 — 09:50",
            "09:50 — 10:30",
            "10:30 — 11:10",
            "11:10 — 11:50",
            "11:50 — 12:30",
            "12:30 — 13:10",
            "13:10 — 13:50",
            "13:50 — 14:30",
            "14:30 — 15:10"
        ],
        "timeremaining": {
            "periodperday": 10,
            "periodlength": 40,
            "starthour": 7,
            "startmin": 50,
        }
    },
    "Online": {
        "notify": false,
        "list": [
            "08:00 – 08:40",
            "08:40 – 09:20",
            "09:20 – 10:00",
            "10:20 – 11:00",
            "11:00 – 11:40",
            "12:00 – 12:40",
            "12:40 – 13:20",
            "13:40 – 14:20",
            "14:20 – 15:00",
            "15:20 – 16:00",
            "16:00 – 16:40"
        ],
        "timeremaining": {
            "periodperday": 10,
            "periodlength": 50,
            "starthour": 7,
            "startmin": 40,
        }
    },
}

// Bookmarks
var bookmarks = {
    "0": {
        "title": "QuickLinks",
        "bookmarks": {
            "0": {
                "title": "Google Classroom",
                "gaiRequired": true,
                "url": "https://classroom.google.com/u/",
                "urlAfter": "/h",
            },
            "1": {
                "title": "Google Classroom - To Do",
                "gaiRequired": true,
                "url": "https://classroom.google.com/u/",
                "urlAfter": "/a/not-turned-in/all",
            },
            "2": {
                "title": "Google Meet",
                "gaiRequired": true,
                "url": "https://meet.google.com/?authuser=",
                "urlAfter": "",
            },
            "3": {
                "title": "Google Docs",
                "gaiRequired": true,
                "url": "https://docs.google.com/document/u/",
                "urlAfter": "/",
            },
            "4": {
                "title": "Google Drive",
                "gaiRequired": true,
                "url": "https://drive.google.com/drive/u/",
                "urlAfter": "/",
            },
        }
    },
    "1": {
        "title": "After School",
        "bookmarks": {
            "0": {
                "title": "YouTube",
                "gaiRequired": false,
                "url": "https://www.youtube.com/",
                "urlAfter": "",
            },
            "1": {
                "title": "Facebook",
                "gaiRequired": false,
                "url": "https://www.facebook.com/",
                "urlAfter": "",
            },
            "2": {
                "title": "Instagram",
                "gaiRequired": false,
                "url": "https://www.instagram.com/",
                "urlAfter": "",
            },
            "3": {
                "title": "𝕏 (Twitter)",
                "gaiRequired": false,
                "url": "https://twitter.com/",
                "urlAfter": "",
            },
            "4": {
                "title": "Reddit",
                "gaiRequired": false,
                "url": "https://www.reddit.com/",
                "urlAfter": "",
            },
        }
    },
}

// For subject cards to appear on the left instead of the right side. (Hard-coded)
var card_left_alterlist = [
    9, 10, 11,
    20, 21, 22,
    31, 32, 33,
    42, 43, 44,
    53, 54, 55,
    64, 65, 66,
    75, 76, 77
]

// For subject cards to appear on the bottom instead of the top side. (Hard-coded)
var card_bottom_alterlist = [
    56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66,
    67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77
]
