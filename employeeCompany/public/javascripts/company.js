$(() => {
    console.log("hello")

    const getUrl = document.location.pathname.split("/")
    console.log(getUrl)

    if (getUrl[getUrl.length - 1] != "all") {
        $("#update-company").css("display","flex")
        $("#delete-company").css("display","flex")
        $("#get-employees").css("display","flex")
        $("#create-company").css("display","none")
        $("caption").text("Company info")
    } else {
        $("#update-company").css("display","none")
        $("#delete-company").css("display","none")
        $("#get-employees").css("display","none")
        $("#create-company").css("display","flex") 
        $("caption").text("Companies info")
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
            name : $("#company-name").val(),
            province : $("#company-province").val(),
            city : $("#company-city").val(),
            registerDate : $("#company-registerDate").val(),
            phoneNumber : $("#company-phoneNumber").val()
        }
        
        $.post("/company/" , newCompany,() => {
            location.reload()
        })
    });

    $("#update-company").submit(function (e) { 
        e.preventDefault();

        const updatedCompany = {
        }

        if ($("#update-company-name").val()) updatedCompany.name = $("#update-company-name").val()
        if ($("#update-company-province").val()) updatedCompany.province = $("#update-company-province").val()
        if ($("#update-company-city").val()) updatedCompany.city = $("#update-company-city").val()
        if ($("#update-company-registerDate").val()) updatedCompany.registerDate = $("#update-company-registerDate").val()
        if ($("#update-company-phoneNumber").val()) updatedCompany.phoneNumber = $("#update-company-phoneNumber").val()

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
        
        document.location.pathname = `/employee/page/all/${companyId[companyId.length - 1]}`
    })
})