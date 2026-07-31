window.addEventListener("load", () => {
    setClassVariables()
})

var classes
var classtime_type = "Regular"
var classtimes = {
    "Regular": {
        "timeremaining": {
            "periodperday": 10,
            "periodlength": 50,
            "starthour": 7,
            "startmin": 40,
        }
    },
    "Special": {
        "timeremaining": {
            "periodperday": 10,
            "periodlength": 40,
            "starthour": 7,
            "startmin": 50,
        }
    },
    "Online": {
        "timeremaining": {
            "periodperday": 10,
            "periodlength": 50,
            "starthour": 7,
            "startmin": 40,
        }
    },
}

var subj = {}
var customClassJSON
const classTimetable = localStorage.getItem("timetable-classTimetable")
function setClassVariables() {
    if (classTimetable === "cu_2390113_p13_sci_comsci") {
        fetch(`${classdatafetchpath}/${classTimetable}.json`)
            .then((res) => res.json())
            .then((data) => {
                regularClasses = data.class
                subj = data.links

                if (data.override.state != true) {
                    classes = data.class
                } if (data.override.state == true) {
                    var weekNum = calculateWeekNumber()

                    if (data.override.class[weekNum]) {
                        classes = data.override.class[weekNum]
                        subj = Object.assign(subj, data.override.links)
                    } if (!data.override.class[weekNum]) {
                        classes = data.class
                    }
                }
                bigPictureScript()
            })
        return
    }
    document.getElementById("subjname").innerHTML = `Big picture isn't supported on custom classes.`;
}

// Public variables
var timeleftinterval = undefined
var bellChimes = new Audio("/timetable/assets/sound/bellChimes.mp3")

function bigPictureScript() {
    // Calculated every 1 second.
    timeleftinterval = setInterval(() => {
        var periodTimeLeft = classtimes[classtime_type]["timeremaining"];
        var periodperday = periodTimeLeft["periodperday"];
        var periodlength = periodTimeLeft["periodlength"];
        var starthour = periodTimeLeft["starthour"];
        var startmin = periodTimeLeft["startmin"];

        var curtimeM = (hour * 60) + minute;
        var curtimeS = (curtimeM * 60) + second;

        var endtime = ((starthour * 60) * 60) + (startmin * 60);
        var timediff = endtime - curtimeS;

        var periodno = -1;

        while (timediff < 0) {
            var timediff = timediff + (periodlength * 60);
            var periodno = periodno + 1;
        }

        var rseconds = timediff % 60;
        var rminutes = Math.floor(timediff / 60);

        if (periodno >= 0 && periodno <= periodperday) {
            var classnumberid = ((today.getDay() - 1) * 11) + (periodno) + 11

            var classtofetch = classes[classnumberid]

            if (classtofetch == "-extend") {
                i = 1
                while (classes[classnumberid - i] == "-extend") {
                    i = i + 1
                }

                classtofetch = [classes[classnumberid - i]]
            }

            if (day == "Sunday" || day == "Saturday") {
                classtofetch = "-"
            }

            if (subj[classtofetch].subjname !== "") {
                classtofetch = subj[classtofetch].subjname
            }

            if (classtofetch == "") {
                classtofetch = "—"
            }

            document.getElementById("subjname").innerHTML = classtofetch

            // ------------------------------------------------------------------

            // document.getElementById("period").innerHTML = periodno
            document.getElementById("timeremaining-refreshcontent").innerHTML = `Period ${periodno} - ${rminutes >= 10 ? rminutes : "0" + rminutes}:${rseconds >= 10 ? rseconds : "0" + rseconds}`;

            // Check if period ends (hour and minutes = 0)
            if ((rminutes == 0) && (rseconds == 0)) {
                // If sound setting is enabled, play the sound.
                if (localStorage.getItem("timetable-enableTimeRemainingSound") === "true") {
                    bellChimes.play();
                }
            }
        }
        if (day !== "Sunday" && day !== "Saturday") {
            if (periodno <= 0) {
                document.getElementById("timeremaining-refreshcontent").innerHTML = `Day Start`;
            }
            if (periodno > periodperday) {
                document.getElementById("timeremaining-refreshcontent").innerHTML = `Day End`;
            }
        } if (day == "Sunday" || day == "Saturday") {
            document.getElementById("timeremaining-refreshcontent").innerHTML = `Weekend`;
        }
    }, 1000);

    fetch("https://api.quotable.io/quotes/random")
        .then((res) => res.json())
        .then((data) => {
            var quote = data

            document.querySelector(".quotes-wrapper").style.opacity = "1"

            document.querySelector(".quote").innerHTML = `"${quote[0].content}"`
            document.querySelector(".author").innerHTML = `— ${quote[0].author}`

            setTimeout(() => {
                document.querySelector(".quotes-wrapper").style.opacity = "0"
            }, 29000);
        })
    setInterval(() => {
        fetch("https://api.quotable.io/quotes/random")
            .then((res) => res.json())
            .then((data) => {
                var quote = data

                document.querySelector(".quotes-wrapper").style.opacity = "1"

                document.querySelector(".quote").innerHTML = `"${quote[0].content}"`
                document.querySelector(".author").innerHTML = `- ${quote[0].author}`

                setTimeout(() => {
                    document.querySelector(".quotes-wrapper").style.opacity = "0"
                }, 29000);
            })
    }, 30000);
}

// ----------------------------------

// var backgrounds = [
//     "/timetable/bigpicture/video/alive.mp4",
//     "/timetable/bigpicture/video/dna.mp4"
// ]

var backgrounds = [
    "https://sylvan.apple.com/Aerials/2x/Videos/SE_A016_C009_SDR_20190717_SDR_4K_HEVC.mov",
    "https://sylvan.apple.com/Aerials/2x/Videos/comp_A114_C001_0305OT_v10_SDR_FINAL_22062018_SDR_4K_HEVC.mov",
    "https://sylvan.apple.com/Aerials/2x/Videos/comp_GL_G002_C002_PSNK_v03_SDR_PS_20180925_SDR_4K_HEVC.mov",
    "https://sylvan.apple.com/Aerials/2x/Videos/comp_GMT026_363A_103NC_E1027_KOREA_JAPAN_NIGHT_v18_SDR_PS_20180907_SDR_4K_HEVC.mov",
    "https://sylvan.apple.com/Aerials/2x/Videos/PA_A001_C007_SDR_20190717_SDR_4K_HEVC.mov",
    "https://sylvan.apple.com/Aerials/2x/Videos/comp_LA_A008_C004_ALTB_ED_FROM_FLAME_RETIME_v46_SDR_PS_20180917_SDR_4K_HEVC.mov",
    "https://sylvan.apple.com/Aerials/2x/Videos/comp_L007_C007_PS_v01_SDR_PS_20180925_SDR_4K_HEVC.mov",
    "https://sylvan.apple.com/Aerials/2x/Videos/comp_GMT312_162NC_139M_1041_AFRICA_NIGHT_v14_SDR_FINAL_20180706_SDR_4K_HEVC.mov",
    "https://sylvan.apple.com/Aerials/2x/Videos/comp_CH_C002_C005_PSNK_v05_SDR_PS_FINAL_20180709_SDR_4K_HEVC.mov",
    "https://sylvan.apple.com/Aerials/2x/Videos/comp_GL_G004_C010_PSNK_v04_SDR_PS_FINAL_20180709_SDR_4K_HEVC.mov",
    "https://sylvan.apple.com/Aerials/2x/Videos/PA_A004_C003_SDR_20190719_SDR_4K_HEVC.mov",
    "https://sylvan.apple.com/Aerials/2x/Videos/comp_LA_A005_C009_PSNK_ALT_v09_SDR_PS_201809134_SDR_4K_HEVC.mov",
    "https://sylvan.apple.com/Aerials/2x/Videos/comp_A009_C001_010181A_v09_SDR_PS_FINAL_20180725_SDR_4K_HEVC.mov",
    "https://sylvan.apple.com/Aerials/2x/Videos/comp_LA_A011_C003_DGRN_LNFIX_STAB_v57_SDR_PS_20181002_SDR_4K_HEVC.mov",
    "https://sylvan.apple.com/Aerials/2x/Videos/KP_A010_C002_SDR_20190717_SDR_4K_HEVC.mov",
    "https://sylvan.apple.com/Aerials/2x/Videos/comp_N013_C004_PS_v01_SDR_PS_20180925_F1970F7193_SDR_4K_HEVC.mov",
    "https://sylvan.apple.com/Aerials/2x/Videos/comp_GMT329_113NC_396B_1105_ITALY_v03_SDR_FINAL_20180706_SDR_4K_HEVC.mov",
    "https://sylvan.apple.com/Aerials/2x/Videos/comp_LA_A006_C004_v01_SDR_FINAL_PS_20180730_SDR_4K_HEVC.mov",
    "https://sylvan.apple.com/Aerials/2x/Videos/comp_A105_C002_v06_SDR_FINAL_25062018_SDR_4K_HEVC.mov",
    "https://sylvan.apple.com/Aerials/2x/Videos/comp_A013_C012_0122D6_CC_v01_SDR_PS_FINAL_20180709_SDR_4K_HEVC.mov",
    "https://sylvan.apple.com/Aerials/2x/Videos/BO_A018_C029_SDR_20190812_SDR_4K_HEVC.mov",
    "https://sylvan.apple.com/Aerials/2x/Videos/comp_CH_C007_C004_PSNK_v02_SDR_PS_FINAL_20180709_SDR_4K_HEVC.mov",
    "https://sylvan.apple.com/Aerials/2x/Videos/comp_GMT314_139M_170NC_NORTH_AMERICA_AURORA__COMP_v22_SDR_20181206_v12CC_SDR_4K_HEVC.mov",
    "https://sylvan.apple.com/Aerials/2x/Videos/comp_LA_A006_C008_PSNK_ALL_LOGOS_v10_SDR_PS_FINAL_20180801_SDR_4K_HEVC.mov",
    "https://sylvan.apple.com/Aerials/2x/Videos/comp_DB_D011_C010_PSNK_DENOISE_v19_SDR_PS_20180914_SDR_4K_HEVC.mov",
    "https://sylvan.apple.com/Aerials/2x/Videos/comp_A001_C004_1207W5_v23_SDR_FINAL_20180706_SDR_4K_HEVC.mov",
    "https://sylvan.apple.com/Aerials/2x/Videos/comp_A083_C002_1130KZ_v04_SDR_PS_FINAL_20180725_SDR_4K_HEVC.mov",
    "https://sylvan.apple.com/Aerials/2x/Videos/PA_A002_C009_SDR_20190730_ALT01_SDR_4K_HEVC.mov",
    "https://sylvan.apple.com/Aerials/2x/Videos/comp_GMT308_139K_142NC_CARIBBEAN_DAY_v09_SDR_FINAL_22062018_SDR_4K_HEVC.mov",
    "https://sylvan.apple.com/Aerials/2x/Videos/comp_H012_C009_PS_v01_SDR_PS_20180925_SDR_4K_HEVC.mov",
    "https://sylvan.apple.com/Aerials/2x/Videos/comp_GL_G010_C006_PSNK_NOSUN_v12_SDR_PS_FINAL_20180709_SDR_4K_HEVC.mov",
    "https://sylvan.apple.com/Aerials/2x/Videos/comp_GMT306_139NC_139J_3066_CALI_TO_VEGAS_v08_SDR_PS_20180824_SDR_4K_HEVC.mov",
    "https://sylvan.apple.com/Aerials/2x/Videos/comp_N008_C009_PS_v01_SDR_PS_20180925_SDR_4K_HEVC.mov",
    "https://sylvan.apple.com/Aerials/2x/Videos/comp_LA_A009_C009_PSNK_v02_SDR_PS_FINAL_20180709_SDR_4K_HEVC.mov",
    "https://sylvan.apple.com/Aerials/2x/Videos/comp_L012_c002_PS_v01_SDR_PS_20180925_SDR_4K_HEVC.mov",
    "https://sylvan.apple.com/Aerials/2x/Videos/comp_H004_C009_PS_v01_SDR_PS_20180925_SDR_4K_HEVC.mov",
    "https://sylvan.apple.com/Aerials/2x/Videos/comp_A108_C001_v09_SDR_FINAL_22062018_SDR_4K_HEVC.mov",
    "https://sylvan.apple.com/Aerials/2x/Videos/comp_GMT329_117NC_401C_1037_IRELAND_TO_ASIA_v48_SDR_PS_FINAL_20180725_F0F6300_SDR_4K_HEVC.mov",
    "https://sylvan.apple.com/Aerials/2x/Videos/comp_DB_D008_C010_PSNK_v21_SDR_PS_20180914_F0F16157_SDR_4K_HEVC.mov",
    "https://sylvan.apple.com/Aerials/2x/Videos/comp_C003_C003_PS_v01_SDR_PS_20180925_SDR_4K_HEVC.mov",
    "https://sylvan.apple.com/Aerials/2x/Videos/PA_A010_C007_SDR_20190717_SDR_4K_HEVC.mov",
    "https://sylvan.apple.com/Aerials/2x/Videos/comp_HK_B005_C011_PSNK_v16_SDR_PS_20180914_SDR_4K_HEVC.mov",
    "https://sylvan.apple.com/Aerials/2x/Videos/comp_H005_C012_PS_v01_SDR_PS_20180925_SDR_4K_HEVC.mov",
    "https://sylvan.apple.com/Aerials/2x/Videos/comp_GMT329_113NC_396B_1105_CHINA_v04_SDR_FINAL_20180706_F900F2700_SDR_4K_HEVC.mov",
    "https://sylvan.apple.com/Aerials/2x/Videos/comp_A015_C018_0128ZS_v03_SDR_PS_FINAL_20180709__SDR_4K_HEVC.mov",
    "https://sylvan.apple.com/Aerials/2x/Videos/comp_A050_C004_1027V8_v16_SDR_FINAL_20180706_SDR_4K_HEVC.mov",
    "https://sylvan.apple.com/Aerials/2x/Videos/comp_DB_D002_C003_PSNK_v04_SDR_PS_20180914_SDR_4K_HEVC.mov",
    "https://sylvan.apple.com/Aerials/2x/Videos/comp_CH_C007_C011_PSNK_v02_SDR_PS_FINAL_20180709_SDR_4K_HEVC.mov",
    "https://sylvan.apple.com/Aerials/2x/Videos/BO_A012_C031_SDR_20190726_SDR_4K_HEVC.mov",
    "https://sylvan.apple.com/Aerials/2x/Videos/comp_A105_C003_0212CT_FLARE_v10_SDR_PS_FINAL_20180711_SDR_4K_HEVC.mov",
    "https://sylvan.apple.com/Aerials/2x/Videos/comp_LW_L001_C003__PSNK_DENOISE_v04_SDR_PS_FINAL_20180803_SDR_4K_HEVC.mov",
    "https://sylvan.apple.com/Aerials/2x/Videos/comp_HK_H004_C010_PSNK_v08_SDR_PS_20181009_SDR_4K_HEVC.mov",
    "https://sylvan.apple.com/Aerials/2x/Videos/comp_A351_C001_v06_SDR_PS_20180725_SDR_4K_HEVC.mov",
    "https://sylvan.apple.com/Aerials/2x/Videos/BO_A014_C008_SDR_20190719_SDR_4K_HEVC.mov",
    "https://sylvan.apple.com/Aerials/2x/Videos/comp_A001_C001_120530_v04_SDR_FINAL_20180706_SDR_4K_HEVC.mov",
    "https://sylvan.apple.com/Aerials/2x/Videos/comp_A006_C003_1219EE_CC_v01_SDR_PS_FINAL_20180709_SDR_4K_HEVC.mov",
    "https://sylvan.apple.com/Aerials/2x/Videos/comp_DB_D001_C001_PSNK_v06_SDR_PS_20180824_SDR_4K_HEVC.mov",
    "https://sylvan.apple.com/Aerials/2x/Videos/BO_A014_C023_SDR_20190717_F240F3709_SDR_4K_HEVC.mov",
    "https://sylvan.apple.com/Aerials/2x/Videos/comp_N008_C003_PS_v01_SDR_PS_20180925_SDR_4K_HEVC.mov",
    "https://sylvan.apple.com/Aerials/2x/Videos/comp_GMT110_112NC_364D_1054_AURORA_ANTARTICA__COMP_FINAL_v34_PS_SDR_20181107_SDR_4K_HEVC.mov",
    "https://sylvan.apple.com/Aerials/2x/Videos/comp_L010_C006_PS_v01_SDR_PS_20180925_SDR_4K_HEVC.mov",
    "https://sylvan.apple.com/Aerials/2x/Videos/comp_1223LV_FLARE_v21_SDR_PS_FINAL_20180709_F0F5700_SDR_4K_HEVC.mov",
    "https://sylvan.apple.com/Aerials/2x/Videos/comp_A103_C002_0205DG_v12_SDR_FINAL_20180706_SDR_4K_HEVC.mov",
    "https://sylvan.apple.com/Aerials/2x/Videos/comp_N003_C006_PS_v01_SDR_PS_20180925_SDR_4K_HEVC.mov",
    "https://sylvan.apple.com/Aerials/2x/Videos/comp_C001_C005_PS_v01_SDR_PS_20180925_SDR_4K_HEVC.mov",
    "https://sylvan.apple.com/Aerials/2x/Videos/comp_A008_C007_011550_CC_v01_SDR_PS_FINAL_20180709_SDR_4K_HEVC.mov",
    "https://sylvan.apple.com/Aerials/2x/Videos/comp_GMT307_136NC_134K_8277_NY_NIGHT_01_v25_SDR_PS_20180907_SDR_4K_HEVC.mov",
    "https://sylvan.apple.com/Aerials/2x/Videos/comp_L004_C011_PS_v01_SDR_PS_20180925_SDR_4K_HEVC.mov",
    "https://sylvan.apple.com/Aerials/2x/Videos/comp_H004_C007_PS_v02_SDR_PS_20180925_SDR_4K_HEVC.mov",
    "https://sylvan.apple.com/Aerials/2x/Videos/HK_H004_C013_4K_SDR_HEVC.mov",
    "https://sylvan.apple.com/Aerials/2x/Videos/comp_DB_D001_C005_COMP_PSNK_v12_SDR_PS_20180912_SDR_4K_HEVC.mov",
    "https://sylvan.apple.com/Aerials/2x/Videos/comp_A012_C014_1223PT_v53_SDR_PS_FINAL_20180709_F0F8700_SDR_4K_HEVC.mov",
    "https://sylvan.apple.com/Aerials/2x/Videos/comp_H007_C003_PS_v01_SDR_PS_20180925_SDR_4K_HEVC.mov",
    "https://sylvan.apple.com/Aerials/2x/Videos/comp_HK_H004_C008_PSNK_v19_SDR_PS_20180914_SDR_4K_HEVC.mov",
    "https://sylvan.apple.com/Aerials/2x/Videos/comp_A007_C017_01156B_v02_SDR_PS_20180925_SDR_4K_HEVC.mov",
    "https://sylvan.apple.com/Aerials/2x/Videos/comp_LW_L001_C006_PSNK_DENOISE_v02_SDR_PS_FINAL_20180709_SDR_4K_HEVC.mov",
    "https://sylvan.apple.com/Aerials/2x/Videos/comp_GMT060_117NC_363D_1034_AUSTRALIA_v35_SDR_PS_FINAL_20180731_SDR_4K_HEVC.mov",
    "https://sylvan.apple.com/Aerials/2x/Videos/comp_C004_C003_PS_v01_SDR_PS_20180925_SDR_4K_HEVC.mov",
    "https://sylvan.apple.com/Aerials/2x/Videos/g201_WH_D004_L014_SDR_20191031_SDR_4K_HEVC.mov",
    "https://sylvan.apple.com/Aerials/2x/Videos/DL_B002_C011_SDR_20191122_SDR_4K_HEVC.mov",
    "https://sylvan.apple.com/Aerials/2x/Videos/g201_TH_803_A001_8_SDR_20191031_SDR_4K_HEVC.mov",
    "https://sylvan.apple.com/Aerials/2x/Videos/g201_TH_804_A001_8_SDR_20191031_SDR_4K_HEVC.mov",
    "https://sylvan.apple.com/Aerials/2x/Videos/RS_A008_C010_SDR_20191218_SDR_4K_HEVC.mov",
    "https://sylvan.apple.com/Aerials/2x/Videos/MEX_A006_C008_SDR_20190923_SDR_4K_HEVC.mov",
    "https://sylvan.apple.com/Aerials/2x/Videos/g201_CA_A016_C002_SDR_20191114_SDR_4K_HEVC.mov",
    "https://sylvan.apple.com/Aerials/2x/Videos/g201_AK_A003_C014_SDR_20191113_SDR_4K_HEVC.mov",
    "https://sylvan.apple.com/Aerials/2x/Videos/FK_U009_C004_SDR_20191220_SDR_4K_HEVC.mov",
    "https://sylvan.apple.com/Aerials/2x/Videos/CR_A009_C007_SDR_20191113_SDR_4K_HEVC.mov",
    "https://sylvan.apple.com/Aerials/2x/Videos/AK_A004_C012_SDR_20191217_SDR_4K_HEVC.mov",
    "https://sylvan.apple.com/Aerials/2x/Videos/G007_C004_UHD_SDR_4K_HEVC.mov",
    "https://sylvan.apple.com/Aerials/2x/Videos/G008_C015_UHD_SDR_4K_HEVC.mov",
    "https://sylvan.apple.com/Aerials/2x/Videos/G009_C003_UHD_SDR_4K_HEVC.mov",
    "https://sylvan.apple.com/Aerials/2x/Videos/G009_C014_UHD_SDR_4K_HEVC.mov",
    "https://sylvan.apple.com/Aerials/2x/Videos/G010_C026_UHD_SDR_v02_4K_HEVC.mov",
    "https://sylvan.apple.com/Aerials/2x/Videos/P001_C005_UHD_SDR_4K_HEVC.mov",
    "https://sylvan.apple.com/Aerials/2x/Videos/P005_C002_UHD_SDR_4K_HEVC.mov",
    "https://sylvan.apple.com/Aerials/2x/Videos/P006_C002_UHD_SDR_4K_HEVC.mov",
    "https://sylvan.apple.com/Aerials/2x/Videos/P007_C027_UHD_SDR_4K_HEVC.mov",
    "https://sylvan.apple.com/Aerials/2x/Videos/Y004_C015_SDR_4K_HEVC.mov",
    "https://sylvan.apple.com/Aerials/2x/Videos/Y005_C003_SDR_4K_HEVC.mov",
    "https://sylvan.apple.com/Aerials/2x/Videos/Y002_C013_SDR_4K_HEVC.mov",
    "https://sylvan.apple.com/Aerials/2x/Videos/Y003_C009_SDR_4K_HEVC.mov",
    "https://sylvan.apple.com/Aerials/2x/Videos/Y011_C001_SDR_4K_HEVC.mov",
    "https://sylvan.apple.com/Aerials/2x/Videos/Y009_C015_SDR_4K_HEVC.mov",
    "https://sylvan.apple.com/Aerials/2x/Videos/Y011_C008_SDR_4K_HEVC.mov",
    "https://sylvan.apple.com/Aerials/2x/Videos/I003_C008_SDR_4K_HEVC.mov",
    "https://sylvan.apple.com/Aerials/2x/Videos/S003_C020_SDR_4K_HEVC.mov",
    "https://sylvan.apple.com/Aerials/2x/Videos/I003_C011_SDR_4K_HEVC.mov",
    "https://sylvan.apple.com/Aerials/2x/Videos/I004_C014_SDR_4K_HEVC.mov",
    "https://sylvan.apple.com/Aerials/2x/Videos/I003_C015_SDR_4K_HEVC.mov",
    "https://sylvan.apple.com/Aerials/2x/Videos/I003_C004_SDR_4K_HEVC.mov",
    "https://sylvan.apple.com/Aerials/2x/Videos/S006_C007_SDR_4K_HEVC.mov",
    "https://sylvan.apple.com/Aerials/2x/Videos/S005_C015_SDR_4K_HEVC.mov",
    "https://sylvan.apple.com/Aerials/2x/Videos/I005_C008_CROP_SDR_4K_HEVC.mov"
]

var videosrc = backgrounds[Math.floor(Math.random() * backgrounds.length)];
document.querySelector(".background-video").src = videosrc

// ----------------------------------

function toggleFullScreen(element) {
    var isInFullScreen = (document.fullscreenElement && document.fullscreenElement !== null) ||
        (document.webkitFullscreenElement && document.webkitFullscreenElement !== null) ||
        (document.mozFullScreenElement && document.mozFullScreenElement !== null) ||
        (document.msFullscreenElement && document.msFullscreenElement !== null);

    if (!isInFullScreen) {
        if (element.requestFullscreen) {
            element.requestFullscreen();
        } else if (element.mozRequestFullScreen) {
            element.mozRequestFullScreen();
        } else if (element.webkitRequestFullScreen) {
            element.webkitRequestFullScreen();
        } else if (element.msRequestFullscreen) {
            element.msRequestFullscreen();
        }
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
    }
}