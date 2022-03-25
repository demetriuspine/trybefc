export const successUserMock = {
  id: 1,
  username: 'Admin',
  email: 'admin@admin.com',
  password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW',
  role: 'admin',
};

export const unsuccesUserMock = {
  id: 1,
  username: 'Admin',
  email: 'admin@admin.com',
  password: '654321',
  role: 'admin',
};

export const responseUser = {
  user: successUserMock,
  token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiYWRtaW5AYWRtaW4uY29tIiwiaWF0IjoxNjQ3NjIxMjUyLCJleHAiOjE2NDgyMjYwNTJ9.6nOI48ao1XpKS1CSy3k3qQIqCCAYnqH-EZQsBa4QIjk"
}

export const successLoginData = {
  email: 'admin@admin.com',
  password: 'secret_admin',
};

export const unsuccessLoginData = {
  email: 'wronguser@admin.com',
  password: 'secret_admin',
};

export const unsuccessPassword = {
  email: 'wronguser@admin.com',
  password: '0123',
};

export const clubsResponse = [
	{
		"id": 1,
		"clubName": "Avaí/Kindermann"
	},
	{
		"id": 2,
		"clubName": "Bahia"
	},
	{
		"id": 3,
		"clubName": "Botafogo"
	},
	{
		"id": 4,
		"clubName": "Corinthians"
	},
	{
		"id": 5,
		"clubName": "Cruzeiro"
	},
	{
		"id": 6,
		"clubName": "Ferroviária"
	},
	{
		"id": 7,
		"clubName": "Flamengo"
	},
	{
		"id": 8,
		"clubName": "Grêmio"
	},
	{
		"id": 9,
		"clubName": "Internacional"
	},
	{
		"id": 10,
		"clubName": "Minas Brasília"
	},
	{
		"id": 11,
		"clubName": "Napoli-SC"
	},
	{
		"id": 12,
		"clubName": "Palmeiras"
	},
	{
		"id": 13,
		"clubName": "Real Brasília"
	},
	{
		"id": 14,
		"clubName": "Santos"
	},
	{
		"id": 15,
		"clubName": "São José-SP"
	},
	{
		"id": 16,
		"clubName": "São Paulo"
	}
]

export const oneClubMock = {
  "id": 4,
  "clubName": "Corinthians"
}

export const matchsMock  = [
  {
    "id": 1,
    "homeTeam": 11,
    "homeTeamGoals": 7,
    "awayTeam": 4,
    "awayTeamGoals": 1,
    "inProgress": false,
    "homeClub": {
      "clubName": "Corinthians"
    },
    "awayClub": {
      "clubName": "Santos"
    }
  },
  {
    "id": 41,
    "homeTeam": 11,
    "homeTeamGoals": 6,
    "awayTeam": 9,
    "awayTeamGoals": 1,
    "inProgress": true,
    "homeClub": {
      "clubName": "Corinthians"
    },
    "awayClub": {
      "clubName": "São Paulo"
    }
}]

export const matchsIsInProgressMock  = [
  {
    "id": 1,
    "homeTeam": 1,
    "homeTeamGoals": 5,
    "awayTeam": 2,
    "awayTeamGoals": 0,
    "inProgress": true,
    "homeClub": {
      "clubName": "Corinthians"
    },
    "awayClub": {
      "clubName": "São Paulo"
    }
  },
  {
    "id": 2,
    "homeTeam": 3,
    "homeTeamGoals": 6,
    "awayTeam": 4,
    "awayTeamGoals": 2,
    "inProgress": true,
    "homeClub": {
      "clubName": "Mirassol"
    },
    "awayClub": {
      "clubName": "Palmeiras"
    }
  }]


export const createMatchMock = {
  id: 1,
  homeTeam: 1,
  homeTeamGoals: 0,
  awayTeam: 8,
  awayTeamGoals: 4,
  inProgress: true,
}