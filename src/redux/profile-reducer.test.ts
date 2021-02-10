import profileReducer, {addPostActionCreator, deletePost} from "./profile-reducer";


let initialState = {
    posts: [
        {id: 1, message: 'Hi, how are you?', likesCount: 4},
        {id: 2, message: "It's my first post", likesCount: 9}
    ],
    profile: null,
    status: '',
};

test('Length of posts should be incremented', () => {
    let action = addPostActionCreator("it.incubator");
    let newState = profileReducer(initialState, action)
    expect(newState.posts.length).toBe(3)
});

test('message of new post should be correct', () => {
    let action = addPostActionCreator("it.incubator");
    let newState = profileReducer(initialState, action)
    expect(newState.posts[2].message).toBe("it.incubator")
});

test('After deleting should be decrement', () => {
    let action = deletePost(1);
    let newState = profileReducer(initialState, action)
    expect(newState.posts.length).toBe(1)
});

test('After deleting length shouldn\'t be decrement if id is incorrect', () => {
    let action = deletePost(3);
    let newState = profileReducer(initialState, action)
    expect(newState.posts.length).toBe(2)
});

