$(() => {
    console.log("hello")

    const getUrl = document.location.pathname.split("/")
    console.log(getUrl)

    fetch(`/employee/all/${getUrl[getUrl.length - 1]}`)
    .then(data => data.json())
    .then(res => {
        for (let i = 0 ; i < JSON.parse(JSON.stringify(res)).length ; i++) {
            $("table tbody").children().eq(i).attr("id",JSON.parse(JSON.stringify(res))[i]._id)
            console.log(JSON.parse(JSON.stringify(res))[i])
        }    
    })

    $("tbody tr").click(function (e) { 
        e.preventDefault();
        $.get(`/employee/${$(this).attr("id")}`, data => {
            document.location.href = `/employee/page/${$(this).attr("id")}`
        })
    });

    $("#create-employee").submit(function (e) { 
        e.preventDefault();

        const newemployee = {
            name : $("#employee-name").val()
        }
        
        $.post("/employee/" , newemployee,() => {
            location.reload()
        })
    });

    $("#update-employee").submit(function (e) { 
        e.preventDefault();

        const updatedemployee = {
            name : $("#update-employee-name").val()
        }

        const updateId = document.location.pathname.split("/")
        
        fetch(`/employee/${updateId[updateId.length -1]}`,
        {method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(updatedemployee)
        })
        .then(res => res.json())
        .then(res => {
            document.location.href = `/employee/page/${updateId[updateId.length - 1]}`
            console.log(res)
        })
    });

    $("#delete-employee").click(function (e) { 
        e.preventDefault();

        const deleteId = document.location.pathname.split("/")

        fetch(`/employee/${deleteId[deleteId.length -1]}`,
        {method: 'DELETE'})
        .then(res => res.json())
        .then(res => {
            document.location.href = "/employee/page/all"
            console.log(res)
        })
    });
})