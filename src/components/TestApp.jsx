import React, { useState } from 'react';
import cx from 'classnames';

export default () => {

    const[like, setLike] = useState(100);
    const[dislike, setDisLike] = useState(25);
    const[likeClicked, setLikeClicked] = useState(false)
    const[disLikeClicked, setDisLikeClicked] = useState(false)
    
    function handleLike(){

        if(like === 100){
            setLikeClicked(true);
            setLike(like + 1);
            
            if(dislike > 25){
               setDisLikeClicked(false);
               setDisLike(dislike - 1);

            }
        
        }else{
            setLikeClicked(false);
            setLike(like - 1);
        }

    }

    function handleDisLike(){

        if(dislike === 25){
            setDisLikeClicked(true);
            setDisLike(dislike + 1);
            
            if(like > 100){
               setLikeClicked(false);
               setLikes(like - 1);

            }
        
        }else{
            setDisLikeClicked(false);
            setDisLike(dislike - 1);
        }

        
    }
    return(
<>
<div>
        <button className= {cx('like-button', likeClicked ? 'liked' : '')} onClick={handleLike}>Like | {like}</button>
        <button className= {cx('dislike-button', disLikeClicked ? 'disliked' : '')}  onClick={handleDisLike}>Dislike | {dislike}</button>
      </div>

      <style>{`
                    .like-button, .dislike-button {
                        font-size: 1rem;
                        padding: 5px 10px;
                        color:   #585858;
                    }

                    .liked, .disliked {
                        font-weight: bold;
                        color: #1565c0;
                    }
                `}</style>

      </>
    )

}