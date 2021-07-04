import './ReposList.css'
import { useEffect, useState, useRef } from 'react'
import RepoItem from '../RepoItem'

export default function ReposList() {
    const list_ref = useRef(null)
    const [repos,setRepos] = useState([])
    const [page,setPage] = useState(1)
    
    const fetchRepos = async (page)=>{
        var today = new Date()
        var prior_date = new Date().setDate(today.getDate()-30)
        const creation_date = new Date(prior_date).toISOString().substr(0,10)

        const response = await fetch(`https://api.github.com/search/repositories?q=created:>${creation_date}&sort=stars&order=desc&page=${page}`)
        const {items} = await response.json()
        

        setRepos([
            ...repos,
            ...(items?.map(item=>({
                id: item.id,
                name: item.name,
                description: item.description,
                stars_count: item.stargazers_count,
                issues_count: item.open_issues_count,
                created_at: (new Date(today - new Date(item.created_at))).getDate(),
                owner:{
                    username: item.owner.login,
                    avatar: item.owner.avatar_url
                }
            }))||[])
        ])
        
    }

    useEffect(()=>{
        fetchRepos(page)
    },[page])

    useEffect(()=>{
        const handleHitBottom = (event) => {
            if (list_ref.current.scrollHeight - 0.2*list_ref.current.offsetHeight <= list_ref.current.scrollTop + list_ref.current.offsetHeight) {
                setPage(page+1)
            }
        }
        list_ref.current.addEventListener('scroll', handleHitBottom)

        return () => {
            list_ref.current.removeEventListener('scroll', handleHitBottom)
        }
    },[page])

    const renderRepos = ()=>{
        return repos.map(repo=>(
            <RepoItem key={repo.id} repo={repo} />
        ))
    }
    
    return (
        <div ref={list_ref} className="ReposList">
            {renderRepos()}
        </div>
    )
}
