import styles from './App.module.css'

import { Header } from './components/Header/Header';
import { Sidebar } from './components/Sidebar/Sidebar';
import { Post } from './components/Post/Post';

// Mocked data
const posts = [
  {
    id: 1,
    author: {
      avatarUrl: 'https://i.pravatar.cc/300',
      name: 'John Doe',
      role: 'Admin',
    },
    content: [
      {type: 'paragraph', content: 'Fala galeraa 👋'},
      {type: 'paragraph', content: 'Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀'},
      {type: 'link' , content: 'https://www.facebook.com'},
    ],
    publishedAt: new Date('2022-01-01T00:00:00'),
  },
  {
    id: 2,
    author: {
      avatarUrl: 'https://i.pravatar.cc/200',
      name: 'Doe',
      role: 'Professor',
    },
    content: [
      {type: 'paragraph', content: 'Fala galeraa 👋'},
      {type: 'paragraph', content: 'Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀'},
      {type: 'link' , content: 'https://www.google.com'},
    ],
    publishedAt: new Date('2022-08-01T14:31:00'),
  },
]

export function App() {
  return (
    <div className="App">
      <Header />
      <div className={styles.wrapper}>
        <Sidebar/>
        <main>
          {posts.map(post =>
            <Post 
              key={post.id}
              author={post.author}
              content={post.content}
              publishedAt={post.publishedAt}
            />
          )}
        </main>
      </div>
    </div>
  )
}