

function BreadCrumbPage({title}:{title:string}) {
  return (
    <div className="w-full border-b border-b-sidebar-border mb-4 bg-sidebar text-sidebar-foreground" >
        <h1 className="text-2xl font-bold" >{title}</h1>
    </div>
  )
}

export default BreadCrumbPage