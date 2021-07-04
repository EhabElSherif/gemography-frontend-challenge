import './RepoItem.css'

export default function RepoItem({repo}) {
    return (
        <div className="RepoItem">
            <img className="repo-owner-avatar" src={repo.owner.avatar} alt={repo.owner.username} />
            <div className="repo-details">
                <h3 className="repo-name">{repo.name}</h3>
                <p className={`repo-description ${repo.description?"":"placeholder"}`}>{repo.description||"No Description"}</p>
                <div className="repo-details-footer">
                    <span className="repo-counter">Stars: {repo.stars_count}</span>
                    <span className="repo-counter">Issues: {repo.issues_count}</span>
                    <p className="repo-user">Submitted {repo.created_at} {`Day${repo.created_at===1?null:"s"}`} ago by <b>{repo.owner.username}</b></p>
                </div>
            </div>
        </div>
    )
}