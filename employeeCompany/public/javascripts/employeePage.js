// const headers = ["firstName", "lastName", "position", "company"]
const headers = ["_id","name", "createdAt"]

$(() => {
    $.get("/company/all", (data) => {
        console.log(data);

        tableCrator(headers, data);
    });

    $("#createCompany").on("submit", (e) => {
        e.preventDefault();

        const newCompany = {
            name: $("#company-name").val(),
        };

        console.log(newCompany);

        $.post("/company/", newCompany, (data) => {
            console.log(data);

            $("table tbody").append("<tr></tr>")

            for (const key in data) {
                if (!headers.includes(key)) continue;
    
                if (key === "company") $("table tbody tr:last").append(`<td>${data[key].name}</td>`)
                else $("table tbody tr:last").append(`<td>${data[key]}</td>`)
            } 
        });
    });
});

function tableCrator(headers, data) {
    $("table thead").append("<tr></tr>")
    for (const key in data[0]) {
        if (!headers.includes(key)) continue;
        if (key == "_id") continue
        $("table thead tr").append(`<th>${key}</th>`)
    };


    for (let i = 0; i < data.length; i++) {
        $("table tbody").append("<tr></tr>")

        for (const key in data[i]) {
            if (!headers.includes(key)) continue;
            if (key == "_id") {
                $("table tbody tr:last").attr("id",data[i][key])

                $("table tbody tr:last").click(function (e) { 
                    e.preventDefault();
                    console.log($(this).attr("id"))
                });

                continue
            }
            if (key === "company") $("table tbody tr:last").append(`<td company="${data[i][key]._id}">${data[i][key].name}</td>`)
            else $("table tbody tr:last").append(`<td>${data[i][key]}</td>`)
        }            
    }
}

function companyInfo(id) {
    $.get(`/company/${id}`, data => {
        console.log(data)
    })
}


// $(() => {
//     $.get("/employee/all", (data) => {
//         console.log(data);

//         tableCrator(headers, data);
//     });

//     $.get("/company/all", (data) => {
//         console.log(data);

//         data.forEach(company => {
//             $("#company").append(`<option value="${company._id}">${company.name}</option>`)
//         });
//     });

//     $("#createNewEmployee").on("submit", (e) => {
//         e.preventDefault();

//         const newEmployee = {
//             firstName: $("#firstName").val(),
//             lastName: $("#lastName").val(),
//             age: $("#age").val(),
//             position: $("#position").val(),
//             company: $("#company").val()
//         };

//         console.log(newEmployee);

//         $.post("/employee", newEmployee, (data) => {
//             console.log(data);
//             $("table tbody").append("<tr></tr>")

//             for (const key in data) {
//                 if (!headers.includes(key)) continue;
    
//                 if (key === "company") $("table tbody tr:last").append(`<td>${data[key].name}</td>`)
//                 else $("table tbody tr:last").append(`<td>${data[key]}</td>`)
//             } 
//         });
//     });
// });