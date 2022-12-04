let profile = {
    provider: 'strava',
    id: 35968753,
    displayName: 'Jason Barnes',
    name: { first: 'Jason', last: 'Barnes' },
    avatar: 'https://dgalywyr863hv.cloudfront.net/pictures/athletes/35968753/10608254/12/large.jpg',
    _raw: '{"id":35968753,"username":"yooperjb","resource_state":2,"firstname":"Jason","lastname":"Barnes","bio":"Pedal Damnit","city":"Eureka","state":"California","country":"United States","sex":"M","premium":true,"summit":true,"created_at":"2018-10-24T07:26:29Z","updated_at":"2022-11-15T07:37:29Z","badge_type_id":1,"weight":64.4101,"profile_medium":"https://dgalywyr863hv.cloudfront.net/pictures/athletes/35968753/10608254/12/medium.jpg","profile":"https://dgalywyr863hv.cloudfront.net/pictures/athletes/35968753/10608254/12/large.jpg","friend":null,"follower":null}',
    _json: {
      id: 35968753,
      username: 'yooperjb',
      resource_state: 2,
      firstname: 'Jason',
      lastname: 'Barnes',
      bio: 'Pedal Damnit',
      city: 'Eureka',
      state: 'California',
      country: 'United States',
      sex: 'M',
      premium: true,
      summit: true,
      created_at: '2018-10-24T07:26:29Z',
      updated_at: '2022-11-15T07:37:29Z',
      badge_type_id: 1,
      weight: 64.4101,
      profile_medium: 'https://dgalywyr863hv.cloudfront.net/pictures/athletes/35968753/10608254/12/medium.jpg',
      profile: 'https://dgalywyr863hv.cloudfront.net/pictures/athletes/35968753/10608254/12/large.jpg',
      friend: null,
      follower: null
    }
  }

  const { ...full_profile } = profile._json; 
  console.log(full_profile);