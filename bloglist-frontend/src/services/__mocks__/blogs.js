const blogs = [  {
  id: '5a451df7571c224a31b5c8ce',
  title: 'HTML is easy',
  author: 'Teppo',
  url: 'foo@foo.org',
  likes: 2,
  user: {
    _id: '5a437a9e514ab7f168ddf138',
    username: 'ptiainen',
    name: 'P Tiainen'
  }
},
{
  id: '5a451e21e0b8b04a45638211',
  title: 'Java is easy',
  author: 'Sari',
  url: 'foo2@foo.org',
  likes: 5,
  user: {
    _id: '5a437a9e514ab7f168ddf138',
    username: 'ptiainen',
    name: 'P Tiainen'
  }
},
{
  id: '5a451e30b5ffd44a58fa79ab',
  title: 'Python is easy',
  author: 'Ellu',
  url: 'foo3@foo.org',
  likes: 7,
  user: {
    _id: '5a437a9e514ab7f168ddf138',
    username: 'ptiainen',
    name: 'P Tiainen'
  }
}
]
const setToken = newToken => {
  var token = `bearer ${newToken}`
}
const getAll = () => {
  return Promise.resolve(blogs)
}

export default { getAll , setToken }