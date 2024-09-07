import {openDB} from "idb";

async function errorHandler() {
    alert("We can't access your storage right now. check if your storage is not full \n" +
        "please close the app and open again if you think now you have free storage")
    localStorage.clear()
    setTimeout(()=>{
        window.location.reload()
    },6000)
}

async function connectToDB() {
    try {
        return openDB('movieDB', 2, {
            upgrade(db) {
                if (!(db.objectStoreNames.contains('watchList'))) {
                    db.createObjectStore('watchList')
                }
                if (!(db.objectStoreNames.contains('user'))) {
                    db.createObjectStore('user')
                }
                if (!(db.objectStoreNames.contains('myPosts'))) {
                    db.createObjectStore('myPosts')
                }
                if (!(db.objectStoreNames.contains('homePosts'))) {
                    db.createObjectStore('homePosts')
                }
            }
        });
    } catch (e) {
        await errorHandler()
    }
}

export async function putWatchList(post) {
    try {
        let db = await connectToDB()
        let tx = db.transaction(['watchList'], 'readwrite')
        let store = tx.objectStore('watchList')

        await store.put(post, 0)
        db.close()
    } catch (e) {
        await errorHandler()
    }
}

export async function getWatchList() {
    try {
        let db = await connectToDB()
        let tx = db.transaction(['watchList'], 'readwrite')
        let store = tx.objectStore('watchList')
        let post = []
        await store.getAll().then((posts) => {
            post = posts[0]
        });
        db.close()
        return post
    } catch (e) {
        await errorHandler()
    }
}

export async function putUserInfo(user) {
    try {
        let db = await connectToDB()
        let tx = db.transaction('user', 'readwrite')
        let store = tx.objectStore('user')

        await store.put(user, 0)
        db.close()
    } catch (e) {
        await errorHandler()
    }
}

export async function getUser() {
    try {
        let db = await connectToDB()
        let tx = db.transaction(['user'], 'readonly')
        let store = tx.objectStore('user')
        let user = {}
        await store.getAll().then((data) => {
            user = data[0]
        });
        db.close()
        return user
    } catch (e) {
        await errorHandler()
    }
}

export async function putUserPosts(posts) {
    try {
        let db = await connectToDB()
        let tx = db.transaction('myPosts', 'readwrite')
        let store = tx.objectStore('myPosts')

        await store.put(posts, 0)
        db.close()
    } catch (e) {
        await errorHandler()
    }
}

export async function getUserPosts() {
    try {
        let db = await connectToDB()
        let tx = db.transaction(['myPosts'], 'readonly')
        let store = tx.objectStore('myPosts')
        let posts = {}
        await store.getAll().then((data) => {
            posts = data[0]
        });
        db.close()
        return posts
    } catch (e) {
        await errorHandler()
    }
}
async function putHomePostsFallBack(posts) {
    try {
        localStorage.setItem('HomePosts', posts)
    } catch (e) {
        await errorHandler()
    }
}
export async function putHomePosts(posts) {
    try {
        let db = await connectToDB()
        let tx = db.transaction('homePosts', 'readwrite')
        let store = tx.objectStore('homePosts')
        let slicedPosts = posts.slice(0, 10).map((post) => {
            return post;
        });
        await store.put(slicedPosts, 0)
        db.close()
    } catch (e) {
        let slicedPosts = posts.slice(0, 10).map((post) => {
            return post;
        });
        await putHomePostsFallBack(slicedPosts)
    }
}
async function getHomePostsFallBack() {
    try {
        let posts = localStorage.getItem('HomePosts')
        return posts
    } catch (e) {
        await errorHandler()
    }
}
export async function getHomePostsCache() {
    try {
        let db = await connectToDB()
        let tx = db.transaction(['homePosts'], 'readonly')
        let store = tx.objectStore('homePosts')
        let posts = {}
        await store.getAll().then((data) => {
            posts = data[0]
        });
        db.close()
        return posts
    } catch (e) {
        await getHomePostsFallBack()
    }
}