export const successUserMock = {
  id: 1,
  username: 'Admin',
  email: 'admin@admin.com',
  password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW',
  role: 'admin',
};

export const unsuccessUserMock = {
  password: 'senha_super_segura_confia'
}

export const roleUser = 'professor_chaos';

export const responseUser = {
  user: successUserMock,
  token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiYWRtaW5AYWRtaW4uY29tIiwiaWF0IjoxNjQ3NjIxMjUyLCJleHAiOjE2NDgyMjYwNTJ9.6nOI48ao1XpKS1CSy3k3qQIqCCAYnqH-EZQsBa4QIjk"
}

export const loginData = {
  email: 'admin@admin.com',
  password: 'secret_admin',
};