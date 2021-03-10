import React, { useState, useEffect, useRef } from 'react'
import styles from './Components.module.css'
import { useSelector, useDispatch } from 'react-redux'
import { getThisItem, doneEditing } from '../actions/itemActions'
import { useHistory } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid';

import EditorJs from 'react-editor-js';
import Header from '@editorjs/header'; 
import Paragraph from '@editorjs/paragraph'
import List from '@editorjs/list'; 
import Quote from '@editorjs/quote'; 
import LinkTool from '@editorjs/link'; 
import Marker from '@editorjs/marker';  
import Warning from '@editorjs/warning'; 
import Delimiter from '@editorjs/delimiter'

const EditPage = ({ match }) => {
    const byWho = useSelector(store => store.auth.user)
    const itemz = useSelector(store => store.item.items)
    const history = useHistory();
    const dispatch = useDispatch()

    const [ id, setId ] = useState('')
    const [ file, setFile ] = useState('')
    const [ title, setTitle ] = useState('')
    const [ by, setBy ] = useState('')
    const [ subtitle, setSubtitle ] = useState('')
    const [ text, setText ] = useState('')
    const [ date, setDate ] = useState('')
    const [ tagText, setTagText ] = useState('')
    const [ tag1, setTag1 ] = useState('')
    const [ tag2, setTag2 ] = useState('')
    const [ tag3, setTag3 ] = useState('')
    const [ tag4, setTag4 ] = useState('')
    const [ views, setViews ] = useState('')
    const [ commCount, setCommCount ] = useState('')
    const [ data, setData ] = useState(null)

    useEffect(() => {
        dispatch(getThisItem(match.params.id))
    }, [dispatch])

    useEffect(() => {
        if(itemz) {
            if(itemz._id === match.params.id) {
                setId(itemz._id)
                setViews(itemz.views)
                setCommCount(itemz.commCount)
                setFile(itemz.picUrl)
                setTitle(itemz.title)
                setSubtitle(itemz.subtitle)
                setText(itemz.text)
                setData(itemz.text.blocks)
                setBy(itemz.by)
                setDate(itemz.date)
                if(itemz.tags) {
                    if(itemz.tags[0]) { setTag1(itemz.tags[0].tag) } else { setTag1('') }
                    if(itemz.tags[1]) { setTag2(itemz.tags[1].tag) } else { setTag2('') }
                    if(itemz.tags[2]) { setTag3(itemz.tags[2].tag) } else { setTag3('') }
                    if(itemz.tags[3]) { setTag4(itemz.tags[3].tag) } else { setTag4('') }
                } else {
                    setTag1('')
                    setTag2('')
                    setTag3('')
                    setTag4('')
                }
            }
        }
    }, [itemz, dispatch])
    
    const handleTitle = e => setTitle(e.target.value)
    const handleSubtitle = e => setSubtitle(e.target.value)
    const handleTags = e => setTagText(e.target.value)

    const addTag = e => {
        if(e.keyCode === 32){
            console.log("space bar pressed");
            if(tag1 === '') {
                setTag1(tagText)
                setTagText('')
            } else if(tag2 === '') {
                setTag2(tagText)
                setTagText('')
            } else if(tag3 === '') {
                setTag3(tagText)
                setTagText('')
            } else if(tag4 === '') {
                setTag4(tagText)
                setTagText('')
            } else {
                console.log("no more tags available");
            }
        }
    }

    const delTag = e => {
        console.log("delete tag");
        if(e.target.id == 'tag1'){
            console.log("tag1");
            setTag1('')
        } else if(e.target.id == 'tag2'){
            console.log("tag2");
            setTag2('')
        } else if(e.target.id == 'tag3'){
            console.log("tag3");
            setTag3('')
        } else if(e.target.id == 'tag4'){
            console.log("tag4");
            setTag4('')
        }
    }

    const handleSubmit = e => {  // (e, index)
        e.preventDefault()
        const editedPost = {
            _id: id,
            views: views,
            commCount: commCount,
            picUrl: file,
            title: title,
            subtitle: subtitle,
            text: text,
            by: by,
            date: date,
            tags: [
                {tag: tag1},
                {tag: tag2},
                {tag: tag3},
                {tag: tag4},
            ]
        }
        dispatch(doneEditing(editedPost))
        setId('')
        setFile('')
        setTitle('')
        setSubtitle('')
        setText('')
        setBy('')
        setDate('')
        setTag1('')
        setTag2('')
        setTag3('')
        setTag4('')
        setViews('')
        setCommCount('')
        history.push('/')
    }
    
    const instanceRef = useRef(null)

    async function handleSave() {
        const savedData = await instanceRef.current.save()
        setText(savedData)
    }

    return (
        <div className={styles.thelist}>
            {byWho ?
                itemz ?
                    itemz._id === match.params.id ?
                        <div>
                            <div className={styles.addpost}>
                                <b>Title</b>
                                <input name="title" type="text" value={title} onChange={handleTitle}></input>
                                <b>Subtitle</b>
                                <input name="subtitle" type="text" value={subtitle} onChange={handleSubtitle}></input>
                                <b>Main Text</b>
                                <div className={styles.myedit}>
                                    <EditorJs
                                        instanceRef={instance => instanceRef.current = instance} 
                                        tools={{ 
                                            header: Header, 
                                            paragraph: Paragraph,
                                            list: List,
                                            quote: Quote,
                                            linkTool: LinkTool,
                                            marker: Marker,
                                            warning: Warning,
                                            delimiter: Delimiter
                                        }}
                                        data={data}
                                        onChange={handleSave}
                                    />
                                </div>
                                <b>Tags</b>
                                <input name="tagText" type="text" value={tagText} onKeyDown={addTag} onChange={handleTags}></input>
                                <div>
                                    <span id='tag1' className={tag1 ? styles.mytag : null} onClick={delTag}>{tag1 ? tag1 : tag1 === '' ? null : null}</span>
                                    <span id='tag2' className={tag2 ? styles.mytag : null} onClick={delTag}>{tag2 ? tag2 : tag2 === '' ? null : null}</span>
                                    <span id='tag3' className={tag3 ? styles.mytag : null} onClick={delTag}>{tag3 ? tag3 : tag3 === '' ? null : null}</span>
                                    <span id='tag4' className={tag4 ? styles.mytag : null} onClick={delTag}>{tag4 ? tag4 : tag4 === '' ? null : null}</span>
                                </div>
                                <button onClick={handleSubmit}>Submit</button>
                            </div>        
                            <h1>Preview:</h1>                            
                            <h2>{title ? title : null}</h2>
                            <h4>{subtitle ? subtitle : null}</h4>
                            <p>{by ? by : null}</p>
                            <div>
                                {text ?
                                    text.blocks ?
                                        text.blocks.map(elem =>
                                            elem.type === 'header' ?
                                                <h3 key={elem.data.text}>{elem.data.text}</h3>
                                            : elem.type === 'paragraph' ?
                                                <p key={elem.data.text}>{elem.data.text}</p>
                                            : elem.type === 'list' ?
                                                elem.data.style === 'ordered' ?
                                                    <ol key={uuidv4()}>
                                                        {elem.data.items.map(it => <li key={it.slice('0,10')}>{it}</li>)}
                                                    </ol>
                                                : 
                                                    <ul key={uuidv4()}>
                                                        {elem.data.items.map(it => <li key={it.slice('0,10')}>{it}</li>)}
                                                    </ul>
                                            : elem.type === 'delimiter' ?
                                                <h2 key='delimiter'>* * *</h2>
                                            : elem.type === 'quote' ?
                                                <div key='quote'>
                                                    <div>
                                                        <span><h2>"</h2></span>
                                                        <span><p>{elem.data.text}</p></span>
                                                        <span><h2>"</h2></span>
                                                    </div>
                                                    <div>
                                                        <span><h2>By </h2></span>
                                                        <span><p>{elem.data.caption}</p></span>
                                                    </div>
                                                </div>
                                            : elem.type === 'linkTool' ?
                                                <a href={elem.data.link} key={elem.data.link}>
                                                    <b>{elem.data.link}</b>
                                                </a>
                                            : elem.type === 'warning' ?
                                                <div key='warning'>
                                                    <span><h2>! </h2></span>
                                                    <span>
                                                        <div>
                                                            <b>{elem.data.title}</b>
                                                        </div>
                                                        <div>
                                                            <p>{elem.data.message}</p>
                                                        </div>
                                                    </span>
                                                </div>
                                            : null
                                        )
                                    : null
                                : null}
                            </div>
                            <div>
                                <span>{tag1 ? tag1 : tag1 === '' ? null : null}</span>
                                <span>{tag2 ? tag2 : tag2 === '' ? null : null}</span>
                                <span>{tag3 ? tag3 : tag3 === '' ? null : null}</span>
                                <span>{tag4 ? tag4 : tag4 === '' ? null : null}</span>
                            </div>
                        </div>
                        
                    : null
                : null
            : null}
        </div>
    )
}

export default EditPage
