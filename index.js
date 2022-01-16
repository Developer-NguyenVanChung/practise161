async function handelUpdate() {
    await fetch('http://127.0.0.1:1880/User')
        .then(res => res.json())
        .then(data => info(data))

    function info(data) {
        let year2000Down = document.getElementById('tableContent')
        let cost = document.getElementById('tableContent2')
        let tableContent3 = document.getElementById('tableContent3')
        let tableEven = document.getElementById('tableEven')
        let tableOdd = document.getElementById('tableOdd')

        year2000Down.innerHTML = ''
        var cost1 = 0, cost2 = 0, cost3 = 0;
        var jsonList1 = []
        var jsonList2 = []
        const now = new Date().getFullYear()


        // Thực hiện duyệt qua từng phần tử của mảng
        data.forEach((item) => {
            // Những người sinh trước năm 2000
            const yearOfUser = parseFloat(item['Date of birth'])
            if (yearOfUser < 2000) {
                year2000Down.innerHTML += `
                <tr>
                    <td>${item.Id}</td>
                    <td>${item.Name}</td>
                    <td>${item['Date of birth']}</td>
                </tr>
            `
            }
            // Tính chi phí theo năm sinh
            item.cost = 0 // cost là chi phí
            if (yearOfUser < 2000) {
                item.cost = 3000000
                cost1 += 3000000
                jsonList1.push({
                    id: item.Id,
                    name: item.Name,
                    DOB: item['Date of birth'],
                    cost: item.cost
                })
            } else {
                item.cost = 1000000
                cost2 += 1000000
                jsonList2.push({
                    id: item.Id,
                    name: item.Name,
                    DOB: item['Date of birth'],
                    cost: item.cost
                })
            }
            cost.innerHTML += `
            <tr>
                <td>${item.Id}</td>
                <td>${item.Name}</td>
                <td>${item['Date of birth']}</td>
                <td>${item.cost}</td>
            </tr>
            `
            // Những người từ 14 tuổi trở lên
            item.Age = 0;
            if (now - yearOfUser >= 14) {
                item.Age = now - yearOfUser
                tableContent3.innerHTML += `
                    <tr>
                        <td>${item.Id}</td>
                        <td>${item.Name}</td>
                        <td>${item['Date of birth']}</td>
                        <td>${item.Age}</td>
                        <td>${item.cost}</td>
                    </tr>
                `
                cost3 += item.cost;
            }

            // Danh sach theo ID
            if (item.Id % 2 === 0) {
                tableEven.innerHTML += `
            <tr>
                <td>${item.Id}</td>
                <td>${item.Name}</td>
                <td>${item['Date of birth']}</td>
            </tr>
            `
            } else {
                tableOdd.innerHTML += `
            <tr>
                <td>${item.Id}</td>
                <td>${item.Name}</td>
                <td>${item['Date of birth']}</td>
            </tr>
            `
            }


        })
        document.getElementById('totalBefore').innerText = cost1
        document.getElementById('totalAfter').innerText = cost2
        document.getElementById('cost3').innerText = cost3

        // JSON lưu trữ thông tin chi phí theo năm sinh
        let json = JSON.stringify(jsonList1.concat(jsonList2))
        // console.log(json);




    }



}