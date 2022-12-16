// async-await

const getUser = fname => {
    var user = {
        id: 6,
        fname: 'jane'
    };

    return new Promise((resolve, reject) => {
        console.log('getting user');
        setTimeout(() => {
            if (fname == user.fname) {
                resolve(user);
            } else {
                reject('Error:user not found');
            }
        }, 2000);
    });
};

const getTweet = id => {
    var tweet = {
        user_id: 6,
        post: 'love star wars'
    };
    return new Promise((resolve, reject) => {
        console.log('getting tweet');
        setTimeout(() => {
            if (tweet.user_id === id) {
                resolve(tweet);
            } else {
                reject('Error no tweet found for this user');
            }
        }, 2000);
    });
};
const printUserTweet = async fname => {
    const user = await getUser(fname)
    const tweet = await getTweet(user_id)

    return `${user.fname} tweeted ${tweet.post}`;

};
printUserTweet('jane').then(value => {
    console.log(value);
});
