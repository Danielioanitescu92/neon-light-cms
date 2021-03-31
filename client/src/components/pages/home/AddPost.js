import React, { useEffect, useState, useRef } from 'react'
import styles from './styles/AddPost.module.css'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { goItems } from '../../../actions/itemActions'
import { addPostFile, goItemsFiles, goAvatarsFile } from '../../../actions/fileActions'

import EditorJs from 'react-editor-js';
import Header from '@editorjs/header'; 
import Paragraph from '@editorjs/paragraph'
import List from '@editorjs/list'; 
import Quote from '@editorjs/quote'; 
import LinkTool from '@editorjs/link'; 
import Marker from '@editorjs/marker';  
import Warning from '@editorjs/warning'; 
import Delimiter from '@editorjs/delimiter'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'

const AddPost = () => {
    const warnnn = <FontAwesomeIcon icon={faExclamationTriangle} />
    
    const byWho = useSelector(store => store.auth.user)
    const item = useSelector(store => store.item.items)
    const file = useSelector(store => store.file.files.items)
    const piczLoading = useSelector(store => store.file.loadingIt)
    const history = useHistory();
    const dispatch = useDispatch()

    const [ myFile, setMyFile ] = useState('')
    const [ title, setTitle ] = useState('')
    const [ subtitle, setSubtitle ] = useState('')
    const [ text, setText ] = useState('')
    const [ tagText, setTagText ] = useState('')
    const [ tag1, setTag1 ] = useState('')
    const [ tag2, setTag2 ] = useState('')
    const [ tag3, setTag3 ] = useState('')
    const [ tag4, setTag4 ] = useState('')  
    const data = null

    useEffect(() => {
        // REMOVE ALL OLD IMAGES
        dispatch(goItems())
        dispatch(goItemsFiles())
        dispatch(goAvatarsFile())
    }, [])

    useEffect(() => {
        // GO TO HOME
        if(!piczLoading) {
            if(item.length > 0) {
                if(file.length > 0) {
                    console.log("history.push('/')")
                    history.push('/')
                }
            }
        }
    }, [item, file])
    
    const onFileChange = e => {
        setMyFile(e.target.files[0])
    }
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
        if(e.target.id === 'tag1'){
            console.log("tag1");
            setTag1('')
        } else if(e.target.id === 'tag2'){
            console.log("tag2");
            setTag2('')
        } else if(e.target.id === 'tag3'){
            console.log("tag3");
            setTag3('')
        } else if(e.target.id === 'tag4'){
            console.log("tag4");
            setTag4('')
        }
    }

    const handleSubmit = e => {
        e.preventDefault();
        const formData = new FormData()
        formData.append('file', myFile)

        const newItem = {
            views: {
                organic: [],
                facebook: [],
                googleAds: [],
                total: 0
            },
            commCount: 0,
            picUrl: myFile.name,
            title: title,
            subtitle: subtitle,
            text: text,
            by: byWho.name,
            tags: [ 
                {tag: tag1},
                {tag: tag2},
                {tag: tag3},
                {tag: tag4},
            ]
        }
        dispatch(addPostFile(formData, newItem))
        setMyFile('')
        setTitle('')
        setSubtitle('')
        setText('')
        setTag1('')
        setTag2('')
        setTag3('')
        setTag4('')
    }
    
    const instanceRef = useRef(null)

    async function handleSave() {
        const savedData = await instanceRef.current.save()
        setText(savedData)
    }

    return (
        <div className={styles.thelist}>
            <div className={styles.addpost}>
                <label>Picture</label>
                <input name="myFile" type="file" onChange={onFileChange}></input>
                <label>Title</label>
                <input name="title" type="text" value={title} onChange={handleTitle}></input>
                <label>Subtitle</label>
                <input name="subtitle" type="text" value={subtitle} onChange={handleSubtitle}></input>
                <label>Main Text</label>
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
                <label>Tags</label>
                <input name="tagText" type="text" value={tagText} onKeyDown={addTag} onChange={handleTags}></input>
                <div className={styles.tags}>
                    <span id='tag1' className={tag1 ? styles.mytag : null} onClick={delTag}>{tag1 ? tag1 : tag1 === '' ? null : null}</span>
                    <span id='tag2' className={tag2 ? styles.mytag : null} onClick={delTag}>{tag2 ? tag2 : tag2 === '' ? null : null}</span>
                    <span id='tag3' className={tag3 ? styles.mytag : null} onClick={delTag}>{tag3 ? tag3 : tag3 === '' ? null : null}</span>
                    <span id='tag4' className={tag4 ? styles.mytag : null} onClick={delTag}>{tag4 ? tag4 : tag4 === '' ? null : null}</span>
                </div>
                <button onClick={handleSubmit} disabled={piczLoading ? true : false}>Submit</button>
            </div>

            <h1>Preview:</h1>
            <div className={styles.preview} className={styles.textblocks}>
                {text ?
                    text.blocks ?
                        text.blocks.map(elem =>
                            elem.type === 'header' ?
                                <h3 className={styles.blockheader} key={elem.data.text}>{elem.data.text}</h3>
                            : elem.type === 'paragraph' ?
                                <p className={styles.blockparagraph} key={elem.data.text}>{elem.data.text}</p>
                            : elem.type === 'list' ?
                                elem.data.style === 'ordered' ?
                                    <ol className={styles.blocklist} key={Math.floor(Math.random() * 99)}>
                                        {elem.data.items.map(it => <li className={styles.listitem} key={it.slice('0,10')}>{it}</li>)}
                                    </ol>
                                : 
                                    <ul className={styles.blocklist} key={Math.floor(Math.random() * 99)}>
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
                    : null
                : null}
            </div>
        </div>
    )
}

export default AddPost
