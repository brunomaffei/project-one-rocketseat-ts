import { format, formatDistanceToNow } from 'date-fns';
import  ptBR  from 'date-fns/locale/pt-BR';
import { ChangeEvent, FormEvent, InvalidEvent, useState } from 'react';

import { Comment } from '../Comment/Comment';
import styles from '../Post/Post.module.css';
import { Avatar } from '../Avatar/Avatar';

const comments = [
  1,
  2,
  3,
  4
];

interface Author {
  avatarUrl: string;
  name: string;
  role: string;
};

interface Content {
  type: 'paragraph' | 'link';
  content: string;
}

interface PostProps {
  author: Author;
  publishedAt: Date;
  content: Content[];
}

export function Post({ author, content, publishedAt }: PostProps) {
  const [comments, setComments] = useState([
    'Post muito bacana, hein?!'
  ]);

  const [newCommentText, setNewCommentText] = useState('');

  const datePublished = format(publishedAt, "d 'de' LLLL 'às' HH:mm'h'",{
    locale: ptBR,
  });

  const publishedDateRelativeToNow = formatDistanceToNow(publishedAt, {
    locale: ptBR,
    addSuffix: true,
  });

  const handleCreateNewComment = (event: FormEvent) => {
  event.preventDefault();
  setComments([...comments, newCommentText]);
  setNewCommentText('');
  };

  const handleNewCommentChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
  event.target.setCustomValidity('');
  setNewCommentText(event.target.value);
  };

  const deleteComment = (commentToDelete: string) => {
  const commentsWithoutDeletedOne = comments.filter(comment => comment !== commentToDelete);
  setComments(commentsWithoutDeletedOne);
  };

const isNewCommentEmpty = newCommentText.length === 0;

  const handleNewCommentInvalid = (event: InvalidEvent<HTMLTextAreaElement>) => {
  event.target.setCustomValidity('Esse campo é obrigatório');
  };

  return (
      <article className={styles.post}>
        <header>
          <div className={styles.author}>
          <Avatar
            src={author.avatarUrl}
            alt={'Foto de perfil do autor'}
          />
            <div className={styles.authorInfo}>
              <strong>{author.name}</strong>
              <span>{author.role}</span>
            </div>
          </div>

          <time title={datePublished} dateTime={publishedAt.toISOString()}>
            {publishedDateRelativeToNow}
          </time>
        </header>

        <div className={styles.content}>
          {content.map(line => {
            if (line.type === 'paragraph') {
              return <p key={line.content}>{line.content}</p>;
            } else if (line.type === 'link') {
              return <p key={line.content}><a href={line.content}>{line.content}</a></p>;
            }
          })}
        </div>

        <form onSubmit={handleCreateNewComment} className={styles.commentForm}>
          <strong>Deixe seu feedback!</strong>

          <textarea
            name="comment"
            placeholder='Deixe seu feedback'
            onChange={handleNewCommentChange}
            value={newCommentText}
            onInvalid={handleNewCommentInvalid}
            required
          />
          <footer>
            <button 
              type='submit' 
              disabled={isNewCommentEmpty}
            >
              Publicar
            </button> 
          </footer>
        </form>

        <div className={styles.commentList}>
          {comments.map(comment => {
            return (
              <Comment 
                key={comment} 
                content={comment} 
                onDeleteComment={deleteComment}
              />
            )
          }
          )}
        </div>
      </article>
  );
}