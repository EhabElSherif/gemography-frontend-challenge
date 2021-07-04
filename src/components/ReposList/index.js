import './ReposList.css'
import { useEffect, useState } from 'react'

export default function ReposList() {
    const [repos,setRepos] = useState([])
    const [total_count,setTotalCount] = useState(0)
    const [page,setPage] = useState(0)
    
    const getStartCreationDate = ()=>{
        var today = new Date()
        var prior_date = new Date().setDate(today.getDate()-30)
        return new Date(prior_date).toISOString().substr(0,10)
    }

    const fetchRepos = async (page)=>{
        const creation_date = getStartCreationDate()
        const response = await fetch(`https://api.github.com/search/repositories?q=created:>${creation_date}&sort=stars&order=desc&page=${page}`)
        const {total_count,items} = await response.json()
        
        setTotalCount(total_count)

        setRepos(items.map(item=>({
                id: item.id,
                name: item.name,
                description: item.description,
                stars_count: item.stargazers_count,
                issues_count: item.open_issues_count,
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
            <div key={repo.id}>
                {repo.name} by: {repo.owner.username}
            </div>
        ))
    }

    return (
        <div className="ReposList">
            <h5>Total Count last 30 days: {total_count}</h5>
            {
                renderRepos()
            }
        </div>
    )
}
