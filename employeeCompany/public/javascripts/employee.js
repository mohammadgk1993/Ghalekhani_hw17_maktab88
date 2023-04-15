$(() => {
    console.log("hello")

    $("#get-employees").css("display","none")

    const getUrl = document.location.pathname.split("/")
    console.log(getUrl)

    if (!getUrl.includes("all")) {
        $("#update-employee").css("display","flex")
        $("#delete-employee").css("display","flex")
        $("#create-employee").css("display","none")
        $("caption").text("Employee info")
    } else {
        $("#update-employee").css("display","none")
        $("#delete-employee").css("display","none")
        $("#create-employee").css("display","flex") 
        $("caption").text("Employees list")
    }

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
            firstName : $("#employee-firstName").val(),
            lastName : $("#employee-lastName").val(),
            gender : $("#employee-gender").val(),
            birth : $("#employee-birth").val(),
            phoneNumber : $("#employee-phoneNumber").val(),
            city : $("#employee-city").val(),
            position : $("#employee-position").val(),
            company : getUrl[getUrl.length - 1]
        }
        
        $.post("/employee/" , newemployee,() => {
            location.reload()
        })
    });

    $("#update-employee").submit(function (e) { 
        e.preventDefault();

        const updatedemployee = {
            // firstName : $("#update-employee-firstName").val(),
            // lastName : $("#update-employee-lastName").val(),
            // gender : $("#update-employee-gender").val(),
            // birth : $("#update-employee-birth").val(),
            // phoneNumber : $("#update-employee-phoneNumber").val(),
            // city : $("#update-employee-city").val(),
            // position : $("#update-employee-postion").val()
        }

        if (!!$("#update-employee-firstName").val()) updatedemployee.firstName = $("#update-employee-firstName").val()
        if (!!$("#update-employee-lastName").val()) updatedemployee.lastName = $("#update-employee-lastName").val()
        if (!!$("#update-employee-gender").val()) updatedemployee.gender = $("#update-employee-gender").val()
        if (!!$("#update-employee-birth").val()) updatedemployee.birth = $("#update-employee-birth").val()
        if (!!$("#update-employee-phoneNumber").val()) updatedemployee.phoneNumber = $("#update-employee-phoneNumber").val()
        if (!!$("#update-employee-city").val()) updatedemployee.city = $("#update-employee-city").val()
        if (!!$("#update-employee-position").val()) updatedemployee.position = $("#update-employee-position").val()

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