import './ReposList.css'
import { useEffect, useState } from 'react'
import RepoItem from '../RepoItem'

export default function ReposList() {
    const [repos,setRepos] = useState([])
    const [total_count,setTotalCount] = useState(0)
    const [page,setPage] = useState(0)
    
    const fetchRepos = async (page)=>{
        var today = new Date()
        var prior_date = new Date().setDate(today.getDate()-30)
        const creation_date = new Date(prior_date).toISOString().substr(0,10)

        const response = await fetch(`https://api.github.com/search/repositories?q=created:>${creation_date}&sort=stars&order=desc&page=${page}`)
        const {total_count,items} = await response.json()
        
        setTotalCount(total_count)

        setRepos(items.map(item=>({
                id: item.id,
                name: item.name,
                description: item.description,
                stars_count: item.stargazers_count,
                issues_count: item.open_issues_count,
                created_at: (new Date(today - new Date(item.created_at))).getDate(),
                url: item.html_url,
                owner:{
                    username: item.owner.login,
                    avatar: item.owner.avatar_url
                }
            })
        ))
        
    }

    useEffect(()=>{
        fetchRepos(page)
    },[page])

    const renderRepos = ()=>{
        return repos.map(repo=>(
            <RepoItem key={repo.id} repo={repo} />
        ))
    }

    return (
        <div className="ReposList">
            {renderRepos()}
        </div>
    )
}
