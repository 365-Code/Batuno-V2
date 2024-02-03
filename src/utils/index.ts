export type messageType = {
    avatar: string,
    sender: string,
    text: string,
    files: Array<fileType>
  }

export type messagesType = {
    id: string,
    name: string,
    isGroup: boolean,
    messages: Array<messageType>
  }

 export type UserType = {
    username: string,
    uid: string,
    email: string,
    avatar: string,
    logged: boolean,
    phone?: number,
    favourites: Array<string>
}

export type chatUserType = {
    uid: string,
    username: string,
    avatar: string
}

export type detailType = {
    uid: string,
    username: string,
    avatar: string,
    email: string,
    fav?: boolean
}

export type fileType = {
    name: string,
    type: string,
    url: string,
}



export const users = [
    {
        uId: '#073781e8',
        name: 'Mahthilt Vin',
        avatar: '',
        email: '',
        password: '',
        favourite: ['uIds'],
        groups: ['gId']
    }, 
    {
        uId: '#870669a1',
        name: 'Dino Mullen',
        avatar: '',
        email: '',
        password: '',
        favourite: ['uIds'],
        groups: ['gId']
    },
    {
        uId: '#b74def89',
        name: 'Anthony Austin',
        avatar: '',
        email: '',
        password: '',
        favourite: ['uIds'],
        groups: ['gId']
    },
    {
        uId: '#cce847a4',
        name: 'Jaylon Amnioff',
        avatar: '',
        email: '',
        password: '',
        favourite: ['uIds'],
        groups: ['gId']
    },
    {
        uId: '#0b68chmr',
        name: 'Rhea Livingston',
        avatar: '',
        email: '',
        password: '',
        favourite: ['uIds'],
        groups: ['gId']
    },
    {
        uId: '#zfnb6e7j',
        name: 'Susana Boyer',
        avatar: '',
        email: '',
        password: '',
        favourite: ['uIds'],
        groups: ['gId']
    },
]

export const messages = [
    {
        users: ['#073781e8','#870669a1'],
        chat: [
            {
                sender: "#073781e8",
                text: "How about we get together for coffee this weekend!!"
            },
            {
                sender: "#4fvdgf4",
                text: "Amazing!"
            },
            {
                sender: "#4fvdgf4",
                text: "That sounds like an awesome plan to me! 😊"

            },
            {
                sender: "#073781e8",
                text: "Let's see who else wants some fun! 😁"

            },
            {
                sender: "#4fvdgf4",
                text: "Ofcourse, I'm in!?"

            },
            {
                sender: "#4fvdgf4",
                text: 'I have recently discovered an awesome coffee place. Could we PLEASE have it there?'

            },
            {
                sender: "#073781e8",
                text: "How about we get together for coffee this weekend!!"
            },
            {
                sender: "#4fvdgf4",
                text: "Amazing!"
            },
            {
                sender: "#4fvdgf4",
                text: "That sounds like an awesome plan to me! 😊"

            },
            {
                sender: "#073781e8",
                text: "Let's see who else wants some fun! 😁"

            },
            {
                sender: "#4fvdgf4",
                text: "Ofcourse, I'm in!?"

            },
            {
                sender: "#4fvdgf4",
                text: 'I have recently discovered an awesome coffee place. Could we PLEASE have it there?'

            },
        ]
    },
    { 
        users: ['#870669a1','#b74def89'],
        chat: [
            {
                sender: "#4fvdgf4",
                text: "How about we get together for coffee this weekend!!"
            },
            {
                sender: "#4fvdgf4",
                text: "Amazing!"
            },
            {
                sender: "#4fvdgf4",
                text: "That sounds like an awesome plan to me! 😊"

            },
            {
                sender: "#4fvdgf4",
                text: "Let's see who else wants some fun! 😁"

            },
            {
                sender: "#4fvdgf4",
                text: "Ofcourse, I'm in!?"

            },
            {
                sender: "#4fvdgf4",
                text: 'I have recently discovered an awesome coffee place. Could we PLEASE have it there?'

            },
            {
                sender: "#4fvdgf4",
                text: "This is from blank"

            },
            {
                sender: "#4fvdgf4",
                text: "How are you?"

            },
        ]
    }

]

export const avatars = [
    'https://img.freepik.com/free-photo/user-profile-interface-sign-symbol-icon-3d-rendering_56104-1956.jpg?w=1060&t=st=1705472815~exp=1705473415~hmac=622d355f65305847a52ea4f40dc86232c9903b354fa2b911619d8f5f1ba4f355',
    'https://img.freepik.com/free-psd/3d-icon-social-media-app_23-2150049569.jpg?w=740&t=st=1705472713~exp=1705473313~hmac=e7cf82389309a3cd495e88f27ecead81ee92dad729b5bfcd647d8e5a2b4d09d1',
    'https://img.freepik.com/free-photo/3d-rendering-boy-wearing-cap-with-letter-r_1142-40523.jpg?size=626&ext=jpg&ga=GA1.1.2058463804.1704785941&semt=sph',
    'https://img.freepik.com/free-photo/3d-illustration-teenager-with-funny-face-glasses_1142-50955.jpg?size=626&ext=jpg&ga=GA1.1.2058463804.1704785941&semt=sph',
    'https://img.freepik.com/free-photo/view-3d-happy-woman-with-mouth-wide-open_23-2150709950.jpg?size=626&ext=jpg&ga=GA1.1.2058463804.1704785941&semt=sph',
    'https://img.freepik.com/free-photo/portrait-beautiful-hipster-girl-glasses-cap_1142-39044.jpg?t=st=1705319628~exp=1705323228~hmac=80bd6a11b106b98692ef2a6b98dfe6e0914f5ef62b02f373840521738b56f86c&w=740',
    'https://img.freepik.com/free-photo/portrait-girl-glasses-background-city_1142-43091.jpg?t=st=1705320194~exp=1705323794~hmac=e733d9fc80a062109c1e0680201a2efb8bcedbaf4c4dc3c96f97e907cc614029&w=740',
    'https://img.freepik.com/free-photo/3d-illustration-cartoon-character-hoodie-cap_1142-48674.jpg?t=st=1705316732~exp=1705320332~hmac=a5f3dc6f6079b9d0a7d7f935e507cc563349e7481a278df574c0c6d463369f5e&w=740',
    'https://img.freepik.com/free-photo/portrait-boy-glasses-dark-background-3d-rendering_1142-41844.jpg?t=st=1705320260~exp=1705323860~hmac=8257fe512f5bcb8ca1270a5522988766ea35efc3a917d94bd21c559020a63d4c&w=740',
    'https://img.freepik.com/free-photo/portrait-young-man-glasses-suit-3d-rendering_1142-43524.jpg?t=st=1705320282~exp=1705323882~hmac=e2f035abd4fd5c2de7d3e73501d3bccae0e020fcc17065292ca266f2e088dcbb&w=740'
]

export const chats = [
    {   id: '#3fr6g46tgrf54grf',
        users: [ users[0].uId, users[1].uId ],
        chat: {
            groupName: '',
            texts: [
                {
                    sender: users[0].uId,
                    text: "I'm in a band that does Metallica covers with our private parts - it's called Myphallica. Petrovache"
                },
                {
                    sender: users[1].uId,
                    text: "Tim Horton was a hockey player but is the name of a coffee chain, which means my dream of a goat sanctuary being my legacy is not unrealistic"
                },
                {
                    sender: users[2].uId,
                    text: "Why don't we call glasses duocles"
                },
                {
                    sender: users[0].uId,
                    text: "I don't need a big house, just a two-floor condo - you could say I have lofty expectations"
                },
                {
                    sender: users[0].uId,
                    text: "North America should be called Russia since people are always moving so fast. Gralitica"
                },
                {
                    sender: users[1].uId,
                    text: "A tagline for an airline: Take the High Road"
                },
                {
                    sender: users[1].uId,
                    text: "I'm in a band that does Metallica covers with our private parts - it's called Myphallica. Petrovache"
                },
                {
                    sender: users[2].uId,
                    text: "For the name of an act as serious as killing someone, assassination literally translates to buttbuttination"
                },
            ]
        }
    },
    {   id: '#3frfng6tgrf54grf',
        users: [ users[2].uId, users[3].uId ],
        chat: {
            groupName: '',
            texts: [
                {
                    sender: users[0].uId,
                    text: "I'm in a band that does Metallica covers with our private parts - it's called Myphallica. Petrovache"
                },
                {
                    sender: users[1].uId,
                    text: "Tim Horton was a hockey player but is the name of a coffee chain, which means my dream of a goat sanctuary being my legacy is not unrealistic"
                },
                {
                    sender: users[2].uId,
                    text: "Why don't we call glasses duocles"
                },
                {
                    sender: users[0].uId,
                    text: "I don't need a big house, just a two-floor condo - you could say I have lofty expectations"
                },
                {
                    sender: users[0].uId,
                    text: "North America should be called Russia since people are always moving so fast. Gralitica"
                },
                {
                    sender: users[1].uId,
                    text: "A tagline for an airline: Take the High Road"
                },
                {
                    sender: users[1].uId,
                    text: "I'm in a band that does Metallica covers with our private parts - it's called Myphallica. Petrovache"
                },
                {
                    sender: users[2].uId,
                    text: "For the name of an act as serious as killing someone, assassination literally translates to buttbuttination"
                },
            ]
        }
    },
    {   id: '#3fr6gmdirng54grf',
        users: [ users[0].uId, users[3].uId ],
        chat: {
            groupName: '',
            texts: [
                {
                    sender: users[0].uId,
                    text: "I'm in a band that does Metallica covers with our private parts - it's called Myphallica. Petrovache"
                },
                {
                    sender: users[1].uId,
                    text: "Tim Horton was a hockey player but is the name of a coffee chain, which means my dream of a goat sanctuary being my legacy is not unrealistic"
                },
                {
                    sender: users[2].uId,
                    text: "Why don't we call glasses duocles"
                },
                {
                    sender: users[0].uId,
                    text: "I don't need a big house, just a two-floor condo - you could say I have lofty expectations"
                },
                {
                    sender: users[0].uId,
                    text: "North America should be called Russia since people are always moving so fast. Gralitica"
                },
                {
                    sender: users[1].uId,
                    text: "A tagline for an airline: Take the High Road"
                },
                {
                    sender: users[1].uId,
                    text: "I'm in a band that does Metallica covers with our private parts - it's called Myphallica. Petrovache"
                },
                {
                    sender: users[2].uId,
                    text: "For the name of an act as serious as killing someone, assassination literally translates to buttbuttination"
                },
            ]
        }
    },
    {   id: '#3fr6g46tgpimunde',
        users: [ users[0].uId, users[4].uId, users[2].uId ],
        chat: {
            groupName: 'Coffee Nerds',
            texts: [
                {
                    sender: users[0].uId,
                    text: "I'm in a band that does Metallica covers with our private parts - it's called Myphallica. Petrovache"
                },
                {
                    sender: users[1].uId,
                    text: "Tim Horton was a hockey player but is the name of a coffee chain, which means my dream of a goat sanctuary being my legacy is not unrealistic"
                },
                {
                    sender: users[2].uId,
                    text: "Why don't we call glasses duocles"
                },
                {
                    sender: users[0].uId,
                    text: "I don't need a big house, just a two-floor condo - you could say I have lofty expectations"
                },
                {
                    sender: users[0].uId,
                    text: "North America should be called Russia since people are always moving so fast. Gralitica"
                },
                {
                    sender: users[1].uId,
                    text: "A tagline for an airline: Take the High Road"
                },
                {
                    sender: users[1].uId,
                    text: "I'm in a band that does Metallica covers with our private parts - it's called Myphallica. Petrovache"
                },
                {
                    sender: users[2].uId,
                    text: "For the name of an act as serious as killing someone, assassination literally translates to buttbuttination"
                },
            ]
        }
    },
]

export const currentUser = users[0]
export const chatUser = users[1]