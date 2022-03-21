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

export const roleUser = 'professor_chaos';

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