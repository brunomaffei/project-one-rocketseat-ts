import { Trash, ThumbsUp } from 'phosphor-react';
import { useState } from 'react';
import styles from '../Comment/Comment.module.css';
import { Avatar } from '../Avatar/Avatar';

interface CommentProps {
  content: string;
  onDeleteComment: (comment: string) => void;
}

export function Comment({ content, onDeleteComment }: CommentProps) {
  const [likeCount, setLikeCount] = useState(0);

  const handleDeleteComment = () => {
    onDeleteComment(content);
  };

  const handleLikeComment = () => {
    setLikeCount((state) => {
      return state + 1;
    });
  };

  return (
    <div className={styles.comment}>
       <Avatar 
        hasBorder={false} 
        src="https://avatars.githubusercontent.com/u/47982525?v=4"
        alt={'avatar'}
        />
       <div className={styles.commentBox}>
        <div className={styles.commentContent}>
          <header>
             <div className={styles.authorAndTime}>
              <strong>Bruno Maffei</strong>
              <time title="11 de Maio às 08:13" dateTime="2022-05-11 08:13:30">Cerca de 1hr atrás</time>
             </div>

             <button onClick={handleDeleteComment} title="Deletar comentário">
              <Trash size={24} />
             </button>
          </header>
            <p>{content}</p>
        </div>

        <footer>
          <button onClick={handleLikeComment}>
            <ThumbsUp size={20} />
            Aplaudir <span>{likeCount}</span>
          </button>
        </footer>
       </div>
    </div>
  );
}