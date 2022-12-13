let profile = {
    provider: 'strava',
    id: 35968753,
    displayid: 'Jason Barnes',
    id: { first: 'Jason', last: 'Barnes' },
    avatar: 'https://dgalywyr863hv.cloudfront.net/pictures/athletes/35968753/10608254/12/large.jpg',
    _raw: '{"id":35968753,"userid":"yooperjb","resource_state":2,"firstid":"Jason","lastid":"Barnes","bio":"Pedal Damnit","city":"Eureka","state":"California","country":"United States","sex":"M","premium":true,"summit":true,"created_at":"2018-10-24T07:26:29Z","updated_at":"2022-11-15T07:37:29Z","badge_type_id":1,"weight":64.4101,"profile_medium":"https://dgalywyr863hv.cloudfront.net/pictures/athletes/35968753/10608254/12/medium.jpg","profile":"https://dgalywyr863hv.cloudfront.net/pictures/athletes/35968753/10608254/12/large.jpg","friend":null,"follower":null}',
    _json: {
      id: 35968753,
      userid: 'yooperjb',
      resource_state: 2,
      firstid: 'Jason',
      lastid: 'Barnes',
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

var routes = [
  { id: '41550273', name: 'Coastal Trail Loop' },
  { id: '41550287', name: 'Grasshopper Lookout Loop' },
  { id: '41552966', name: 'Lassic Loop' },
  { id: '41550294', name: 'Little Bald Hills Loop' },
  { id: '41552773', name: 'Look Prairie - Peavine Loop' },
  { id: '41550317', name: 'Lostaggon' },
  { id: '41552498', name: 'Paradise Royale/ Pacific Rim' },
  { id: '41552660', name: 'Ship Mountain - French Hill Loop' },
  { id: '41552569', name: 'Showers Pass Loop' }
  ];

var ridden = [
  { id: '41550317', name: 'Lostaggon' },
  { id: '41552569', name: 'Showers Pass Loop' }
  ];

  routes = routes.filter(ar => !ridden.find(rm => (rm.id === ar.id)))

  // const { ...full_profile } = profile._json;
  // console.log(full_profile);

  console.log("routes after removal", routes);