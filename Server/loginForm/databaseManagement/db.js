/**
 * @type {Record<String, {firstname:String, lastname:String, age: number, email: String, password: String}>} - 
 * 
 * This is our Database that contains our fictional users, Play with it as you wish.
 */
const db = {
    "user1":{
        firstname: "Sekiro",
        lastname: "Shadow Die Twice",
        email: "sekiro4@exemple.com",
        age: 29,
        password: "Sekiro1234"
    },
    "user2":{
        firstname: "Kakarot",
        lastname: "Bardock",
        email: "songoku@exmeple.com",
        password: "UltraInstinctGoku3",
        age: 35
    },
    "user3":{
        firstname: "Vegeta",
        lastname: "Super Saiyan",
        email: "supervegeta@exemple.com",
        password: "SuperVegeta 1234",
        age: 36
    }
};

/**
 * 
 * @param {{firstname:String, lastname:String, age: number, email: String}} userLogData 
 * @returns {typeof db["user1"] | null}
 */
function getUserData(userLogData){
    let isPresent = false;
    let userData;

    for(let key in db){
        const user = db[key];
        if(user.email === userLogData.email && user.password === userLogData.pass){
            isPresent = true;
            userData = user;
            break;
        }
    }

    if(isPresent){
        delete userData.password;
    }

    return (isPresent) ? userData : null;
};

module.exports = {
    getUserData: getUserData
};