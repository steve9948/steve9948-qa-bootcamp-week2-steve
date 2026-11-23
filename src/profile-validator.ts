type userProfile = {
    id:number,
    username:string,
    settings?:{notifications:boolean}
}

const userWithoutNOtifications:userProfile = {
    id:1,
    username:"stephen"
}

const userWithSettings:userProfile = {
    id:2,
    username:"stephen",
}

const userWithNotifications:userProfile = {
    id:3,
    username:"stephen",
    settings:{notifications:true}
}

function isNotified(user:userProfile):boolean{
    return user.settings?.notifications ?? false
}

console.log(userWithoutNOtifications.username, "isNotified:", isNotified(userWithoutNOtifications))
console.log(userWithSettings.username, "has settings:", isNotified(userWithSettings))
console.log(userWithNotifications.username, "isNotified:", isNotified(userWithNotifications))