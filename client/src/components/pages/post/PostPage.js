import React, { useState, useEffect } from 'react'
import styles from './styles/PostPage.module.css'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { getThisItem, doneEditingCC } from '../../../actions/itemActions'
import { getThisComms, addComment, deleteComment, addLike, removeLike } from '../../../actions/commentActions'
import { getThisReps, addReply, deleteReply, addRLike, removeRLike } from '../../../actions/replyActions'
import { getItemsFiles, goItemsFiles } from '../../../actions/fileActions'
import { v4 as uuidv4 } from 'uuid';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'

const PostPage = ({ match }) => {
    const warnnn = <FontAwesomeIcon icon={faExclamationTriangle} />

    const dispatch = useDispatch()

    const [ myItem, setMyItem ] = useState({})
    const [ comment, setComment ] = useState('')
    const [ parentComm, setParentComm ] = useState('')
    const [ reply, setReply ] = useState(false)
    
    const byWho = useSelector(store => store.auth.user)
    const itemz = useSelector(store => store.item.items)
    const commentz = useSelector(store => store.comment.comments)
    const commentzLoading = useSelector(store => store.comment.loading)
    const repliez = useSelector(store => store.reply.replies)
    const repliezLoading = useSelector(store => store.reply.loading)
    const picz = useSelector(store => store.file.files.items)
    const piczLoading = useSelector(store => store.file.loadingIt)
    const itemzLoading = useSelector(store => store.item.loading)

    useEffect(() => {
        if(byWho) {
            dispatch(getThisItem(match.params.id))
            dispatch(getThisComms(match.params.id))
            dispatch(getThisReps(match.params.id))
        }
    }, [byWho])

    useEffect(() => {
        dispatch(goItemsFiles());
        if(byWho) {
            if(itemz) {
                if(itemz._id === match.params.id) {
                    setMyItem(itemz)
                }
                if(itemz.picUrl) {
                    if(!piczLoading) {
                        if(!itemzLoading) {
                            dispatch(getItemsFiles([itemz.picUrl]))
                        }
                    }
                }
            }
        }
    }, [itemz])

    const handleComment = e => setComment(e.target.value)
    const handleReply = e => {
        setReply(true)
        setParentComm(e.target.id)
    }

    const addingComment = e => {
        e.preventDefault()
        let editedPost = myItem
        editedPost = {...editedPost, commCount: editedPost.commCount}
        dispatch(doneEditingCC(editedPost))
        if(!reply) {
            const newComment = {
                name: byWho.name,
                email: byWho.email,
                comment: comment,
                forWich: myItem._id
            }
            dispatch(addComment(newComment))
        } else {
            const newReply = {
                name: byWho.name,
                email: byWho.email,
                comment: comment,
                forWich: myItem._id,
                parentComm: parentComm
            }
            dispatch(addReply(newReply))
        }
        setComment('')
        setParentComm('')
        setReply(false)
    }

    const handleDelComm = e => {
        let editedPost = myItem
        if(repliez) {
            repliez.map(rep => {
                if(rep.parentComm === e.target.id) {
                    dispatch(deleteReply(rep._id, match.params.id))                                
                    // modify item.countComm:
                    editedPost = {...editedPost, commCount: editedPost.commCount-1}
                }
            })
        }
        if(reply) {
            setReply(false)
        }
        dispatch(deleteComment(e.target.id, match.params.id))

        // modify item.countComm:
        editedPost = {...editedPost, commCount: editedPost.commCount-1}
        dispatch(doneEditingCC(editedPost))
    }

    const handleDelRep = e => {
        let editedPost = myItem
        dispatch(deleteReply(e.target.id, match.params.id))
        if(reply) {
            setReply(false)
        }
        // modify item.countComm:
        editedPost = {...editedPost, commCount: editedPost.commCount-1}
        dispatch(doneEditingCC(editedPost))
    }

    const handleCommLike = e => {
        e.preventDefault()        
        if(localStorage.getItem(`userId`)) {
            const newLike = {
                commentId: e.target.value,
                userId: localStorage.getItem(`userId`),
                itemId: myItem._id
            }
            dispatch(addLike(newLike))
        }
    }
        
    const handleCommUnlike = e => {
        e.preventDefault()    
        if(localStorage.getItem(`userId`)) {
            const newLike = {
                commentId: e.target.value,
                userId: localStorage.getItem(`userId`),
                itemId: myItem._id
            }
            dispatch(removeLike(newLike))
        }
    }

    const handleRepLike = e => {
        e.preventDefault()        
        if(localStorage.getItem(`userId`)) {
            const newLike = {
                replyId: e.target.value,
                userId: localStorage.getItem(`userId`),
                itemId: myItem._id
            }
            dispatch(addRLike(newLike))
        }
    }

    const handleRepUnlike = e => {
        e.preventDefault()    
        if(localStorage.getItem(`userId`)) {
            const newLike = {
                replyId: e.target.value,
                userId: localStorage.getItem(`userId`),
                itemId: myItem._id
            }
            dispatch(removeRLike(newLike))
        }
    }

    return (
        itemz ?
            itemz._id === match.params.id ?
                <div key={itemz._id} className={styles.itemz}>

                    <div className={styles.post}>
                        <h1>{itemz.title}</h1>
                        <div className={styles.main}>
                            <Link to={`/author/${itemz.by}`}> <p className={styles.hovering}>{itemz.by}</p> </Link>
                            <p>{itemz.date.slice(0,10)} {itemz.date.slice(11,19)}</p>
                            <p>{itemz.views.total} views</p>
                            <p>{itemz.commCount} comments</p>
                        </div>
                        {picz ?
                            picz.length > 0 ?
                                picz.map(pic =>
                                    pic === null ?
                                        null
                                    : pic.filename === itemz.picUrl ?
                                        <img key={pic._id} src={`/api/uploads/image/${pic.filename}`} alt={itemz.title} width="50" height="50"></img>
                                    : null
                                )
                            : null
                        : null}
                        <h4>{itemz.subtitle}</h4>
                        <div className={styles.textblocks}>
                            {itemz.text ?
                                itemz.text.blocks ?
                                    itemz.text.blocks.map(elem =>
                                        elem.type === 'header' ?
                                            <h3 className={styles.blockheader} key={elem.data.text}>{elem.data.text}</h3>
                                        : elem.type === 'paragraph' ?
                                            <p className={styles.blockparagraph} key={elem.data.text}>{elem.data.text}</p>
                                        : elem.type === 'list' ?
                                            elem.data.style === 'ordered' ?
                                                <ol className={styles.blocklist} key={uuidv4()}>
                                                    {elem.data.items.map(it => <li className={styles.listitem} key={it.slice('0,10')}>{it}</li>)}
                                                </ol>
                                        : 
                                                <ul className={styles.blocklist} key={uuidv4()}>
                                                    {elem.data.items.map(it => <li className={styles.listitem} key={it.slice('0,10')}>{it}</li>)}
                                                </ul>
                                        : elem.type === 'delimiter' ?
                                            <h2 className={styles.delimiter} key='delimiter'>* * *</h2>
                                        : elem.type === 'quote' ?
                                            <div className={styles.quote} key='quote'>
                                                <div className={styles.quotequote}>
                                                    <h2 className={styles.firstq}>"</h2>
                                                    <blockquote>{elem.data.text}</blockquote>
                                                    <h2 className={styles.secondq}>"</h2>
                                                </div>
                                                <div className={styles.quoteby}>
                                                    <i>{elem.data.caption}</i>
                                                </div>
                                            </div>
                                        : elem.type === 'linkTool' ?
                                            <a className={styles.linktool} href={elem.data.link} key={elem.data.link}>
                                                <b>{elem.data.link}</b>
                                            </a>
                                        : elem.type === 'warning' ?
                                            <div className={styles.warning} key='warning'>
                                                <h2 className={styles.warnsign}>{warnnn}</h2>
                                                <div className={styles.warndiv}>
                                                    <b>{elem.data.title}</b>
                                                    <p>{elem.data.message}</p>
                                                </div>
                                            </div>
                                        : null
                                    )
                                : <p>{itemz.text}</p>
                            : null}
                        </div>
                        {itemz.tags ?
                            <div className={styles.tagsdiv}>
                                {itemz.tags.map(t =>
                                    t.tag !== '' ?
                                        <div key={t._id}>
                                            <Link to={`/search/${t.tag}`} className={styles.tag}> <p>{t.tag}</p> </Link>
                                        </div>
                                    : null)}
                            </div>
                        : null}
                    </div>

                    <div className={styles.comments}>

                        <h3 className={styles.commentstitle}>{itemz.commCount} Comments</h3>

                        <div className={styles.divider}></div>

                        {commentz ? commentz.map(comm => 
                            comm.forWich === itemz._id ?
                                <div key={comm._id} className={styles.comment}>
                                    <div className={styles.commenthead}>
                                        <h3>{comm.name}</h3>
                                        <p>{comm.date.slice(0,10)} {comm.date.slice(11,19)}</p>
                                    </div>
                                    <div>
                                        <p>{comm.comment}</p>
                                    </div>
                                    <div className={styles.commentother}>
                                        <div className={styles.commentlike}>                                            
                                                {
                                                    comm.likes.length > 0 ?
                                                        comm.likes.some(lk => lk.userId === localStorage.getItem(`userId`)) ?
                                                            <button value={comm._id} onClick={handleCommUnlike} disabled={!localStorage.getItem(`userId`) ? true : false}>Unlike</button>
                                                        : <button value={comm._id} onClick={handleCommLike} disabled={!localStorage.getItem(`userId`) ? true : false}>Like</button>
                                                    : <button value={comm._id} onClick={handleCommLike} disabled={!localStorage.getItem(`userId`) ? true : false}>Like</button>
                                                }
                                                <p>{comm.likes.length}</p>
                                        </div>
                                        <div className={styles.commentreply}>
                                            <a href='#form' id={comm._id} onClick={handleReply}> Reply </a> 
                                            {byWho ?
                                                byWho.role === "admin" ?
                                                    <button id={comm._id} onClick={ handleDelComm } className={styles.commentdel}> X </button>
                                                : null
                                            : null}                                    
                                        </div>
                                    </div>

                                    <div>
                                        {repliez ? repliez.map(rep =>
                                            rep.parentComm === comm._id ?
                                                <div key={rep._id} className={styles.reply}>
                                                    <div className={styles.commenthead}>
                                                        <h3>{rep.name}</h3>
                                                        <p>{rep.date.slice(0,10)} {rep.date.slice(11,19)}</p>
                                                    </div>
                                                    <div>
                                                        <p>{rep.comment}</p>
                                                    </div>
                                                    <div className={styles.commentother}>
                                                        <div className={styles.commentlike}>
                                                            {
                                                                rep.likes.length > 0 ?
                                                                    rep.likes.some(lk => lk.userId === localStorage.getItem(`userId`)) ?
                                                                        <button value={rep._id} onClick={handleRepUnlike} disabled={!localStorage.getItem(`userId`) ? true : false}>Unlike</button>
                                                                    : <button value={rep._id} onClick={handleRepLike} disabled={!localStorage.getItem(`userId`) ? true : false}>Like</button>
                                                                : <button value={rep._id} onClick={handleRepLike} disabled={!localStorage.getItem(`userId`) ? true : false}>Like</button>
                                                            }
                                                            <p>{rep.likes.length}</p> 
                                                        </div>
                                                        <div className={styles.commentreply}>
                                                            {byWho ?
                                                                byWho.role === "admin" ?
                                                                <button id={rep._id} onClick={handleDelRep} className={styles.commentdel}> X </button>
                                                                : null
                                                            : null}   
                                                        </div>
                                                    </div>                                                     
                                                </div>
                                            : null
                                        ) : null}
                                    </div>

                                    <div className={styles.divider}></div>

                                </div>
                            : null
                        ) : null}

                        {byWho ? 
                            <div>
                                <h3>Add a comment</h3>
                                <form id="form" onSubmit={addingComment} className={styles.commform}>
                                    <textarea name="comment" rows="5" value={comment} onChange={handleComment} className={styles.commformtext}/>
                                    <input type="submit" value={reply ? "Add Reply" : "Add comment"}  disabled={itemzLoading ? true : commentzLoading ? true : repliezLoading ? true : false} className={styles.commformsubmit}></input>
                                </form>
                            </div>
                        : null}

                    </div>
                </div>
            : null
        // )
        : null
    )
}

export default PostPage
