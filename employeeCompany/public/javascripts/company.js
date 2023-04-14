$(() => {
    console.log("hello")

    const getUrl = document.location.pathname.split("/")
    console.log(getUrl)

    if (getUrl[getUrl.length - 1] != "all") {
        $("#update-company").css("display","flex")
        $("#delete-company").css("display","flex")
        $("#create-company").css("display","none")
    } else {
        $("#update-company").css("display","none")
        $("#delete-company").css("display","none")
        $("#create-company").css("display","flex") 
    }

    fetch(`/company/${getUrl[getUrl.length - 1]}`)
    .then(data => data.json())
    .then(res => {
        for (let i = 0 ; i < JSON.parse(JSON.stringify(res)).length ; i++) {
            $("table tbody").children().eq(i).attr("id",JSON.parse(JSON.stringify(res))[i]._id)
            console.log(JSON.parse(JSON.stringify(res))[i])
        }    
    })

    $("tbody tr").click(function (e) { 
        e.preventDefault();
        $.get(`/company/${$(this).attr("id")}`, data => {
            document.location.href = `/company/page/${$(this).attr("id")}`
        })
    });

    $("#create-company").submit(function (e) { 
        e.preventDefault();

        const newCompany = {
            name : $("#company-name").val()
        }
        
        $.post("/company/" , newCompany,() => {
            location.reload()
        })
    });

    $("#update-company").submit(function (e) { 
        e.preventDefault();

        const updatedCompany = {
            name : $("#update-company-name").val()
        }

        const updateId = document.location.pathname.split("/")
        
        fetch(`/company/${updateId[updateId.length -1]}`,
        {method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(updatedCompany)
        })
        .then(res => res.json())
        .then(res => {
            document.location.href = `/company/page/${updateId[updateId.length - 1]}`
            console.log(res)
        })
    });

    $("#delete-company").click(function (e) { 
        e.preventDefault();

        const deleteId = document.location.pathname.split("/")

        fetch(`/company/${deleteId[deleteId.length -1]}`,
        {method: 'DELETE'})
        .then(res => res.json())
        .then(res => {
            document.location.href = "/company/page/all"
            console.log(res)
        })
    });
    
    $("#get-employees").click(function (e) { 
        e.preventDefault()

        const companyId = document.location.pathname.split("/")

        fetch(`/company/${companyId[companyId.length -1]}`)
        .then(res => res.json())
        .then(res => {
            document.location.href = "/employee/page/all"
            console.log(res)
        })
    })
})