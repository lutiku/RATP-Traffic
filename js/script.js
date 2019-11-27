//alert('hello') ;
function setTime()
{
    const date= new Date()
    const  formattedTime = date.getHours() + '<span class="blink">:</span>' +
        (date.getMinutes() <10 ? '0' : '') + date.getMinutes()
    document.querySelector('.time h2').innerHTML = formattedTime

}



function getApiData()
{
    const xhr = new XMLHttpRequest()
    xhr.onreadystatechange = function ()
    {
        if(xhr.readyState===4)
        {
            const data = JSON.parse(xhr.responseText) ;
            const rers = data.result.rers.length

            const metros = data.result.metros.length
            let hasProblem = false


            for(let i = 0 ; i < rers ; i++)
            {
                if(data.result.rers[i].slug === 'critical')
                {
                    hasProblem = true
                }

            }


            for(let i = 0 ; i < metros ; i++)
            {
                if(data.result.metros[i].slug === 'critical')
                {
                    hasProblem = true
                }

            }

            document.querySelector('.status h1').innerHTML = hasProblem ? 'Incident(s)' : 'Trafic normal'
            templateType('rers', data.result.rers)
            templateType('metros', data.result.metros)

        }

    }

    xhr.open('GET', 'https://api-ratp.pierre-grimaud.fr/v4/traffic')
    xhr.send()
}

function templateType(type, data)
    {
        let template = document.querySelector('.lines--' + type)
        template.innerHTML = '<div class="col-sm-2">' + type + '</div>'

        const lines = data.length

        for( let i = 0 ; i<lines; i++)
        {
            template.innerHTML += '<div class="col-sm-2 text-center'+ getBackgroundColor(data[i].slug) + '">'+ data[i].line+'</div>'
        }

        console.log(data)
    }
function getBackgroundColor(slug)
{
    switch (slug)
    {
        case 'critical' :
            return 'line--critical'
        break ;

        case 'normal_trav' :
            return 'line--works'
        break ;

        case 'normal' :
        default :
            return ''
        break ;
    }
}
//Timer
setInterval(function ()
    {
        setTime()
    }, 1000) ;

getApiData()


