const { count } = require('console');

let inp = require('readline').createInterface({
    input : process.stdin,
    output : process.stdout
});



let getDays = (date1, date2) =>{

    const week = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let start = new Date(date1);
    let finish = new Date(date2);
    let dayMilliseconds = 1000 * 60 * 60 * 24;
    let monToWed = 0;
    let thuToSat = 0;
    while(start <= finish){
        
        start.setDate(start.getDate());
        let count = week[start.getDay()];
        if( count === "Monday" || count === "Tuesday" || count === "Wednesday"){
            monToWed++;
        }else if(count === "Saturday" || count === "Friday" || count === "Thursday"){
            thuToSat++;
        }
        start = new Date(+start + dayMilliseconds);
    }
    return countPercent(monToWed, thuToSat)
}

let total_classes;
let attend_classes;

let calculateAttendence = (total, attended) =>{

    total_classes = total;
    attend_classes = attended;
    let curr_attendence = attend_classes/total_classes*100
    return curr_attendence;

}

countPercent = (monToWed, thuToSat) =>{
    
    let classInMonToWed = 6;
    let classInThuToSat = 5;
    let allClasses = (classInMonToWed * monToWed) + (classInThuToSat * thuToSat);
    let result = (attend_classes + allClasses)/(total_classes + allClasses)*100
    return result
}

let curr_attendence = calculateAttendence(178, 100);
let difference = getDays("01/15/2024", "02/26/2024")

console.log("current attendance : ", curr_attendence)
console.log("difference attendance : ", difference)