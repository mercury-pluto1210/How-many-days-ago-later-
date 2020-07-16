const weeks = ['S', 'M', 'T', 'W', 'T', 'F', 'S'] // 曜日を生成
const today = new Date() // 今日の日付を取得
let day = today.getDate() // 今日の日にちを取得
let dayOfweek = today.getDay() // 今日の曜日を取得
let todayWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", 
"Thursday", "Friday", "Saturday"][dayOfweek] // 今日の曜日を生成
let month = today.getMonth() // 今月の月を取得
let year = today.getFullYear() // 今年の西暦を取得

function showCalendar(year, month) {
  // 生成されたカレンダーを表示する
  const calendarHtml = createCalendar(year, month)
  document.querySelector('#calendar').innerHTML = calendarHtml
}

function createCalendar(year, month){
  // 選択したカレンダーを生成する
  const first_day = new Date(year, month, 1) // 月の初日を取得
  const last_day = new Date(year, month + 1, 0) // 月の末日を取得
  const startDate = first_day.getDay() // 月の初日の曜日を取得
  const endDate = last_day.getDate() // 月の末日

  const lastMonth_lastDay = new Date(year, month, 0)　// 前月の末日を取得
  const lastMonth_endDate = lastMonth_lastDay.getDate() // 前月の末日

  let day_count = 1 // 日にちをカウントする
  let calendarHtml = '' // HTMLを組み立てる変数

  const calendarMonth = month + 1
  calendarHtml += '<h1 class="calendar-title">' + year + '/' + calendarMonth + '</h1>'
  calendarHtml += '<table class="calendar-body">'

  // 曜日の行を生成
  for(let i = 0; i < weeks.length; i++){
    calendarHtml += '<td class="calendar-body-text week-text">' + weeks[i] + '</td>'
  }

  // 日付の行と列を生成
  for(let j = 0; j < 6; j++){
    // 行を生成
    calendarHtml += '<tr>'

    for(let k = 0; k < 7; k++){
      if(j == 0 && k < startDate){
        // 月の初日より前日の場合の処理
        let num = lastMonth_endDate - startDate + k + 1
        calendarHtml += '<td class="calendar-body-text is-disabled">' + num + '</td>'
      }
      else if(day_count > endDate){
        // 月の末日を超えた場合の処理
        let num = day_count - endDate
        calendarHtml += '<td class="calendar-body-text is-disabled">' + num + '</td>'
        day_count++
      }
      else{
        // 普通の日の処理
        calendarHtml += `<td class="calendar-body-text"
        data-date="${year}/${month}/${day_count}">${day_count}</td>`
        day_count++
      }
    }
    calendarHtml += '</tr>'
  }
  calendarHtml += '</table>'

  return calendarHtml
}

// 前月ボタンを押した場合の処理
document.querySelector('#prev').addEventListener('click', moveBeforeCalendar)
function moveBeforeCalendar(e) {
  document.querySelector('#calendar').innerHTML = ''
  month--

  if (month < 1) {
    // 1月より前にいった場合の処理
    year--
    month = 12
  }

  showCalendar(year, month)
}

// 次月ボタンを押した場合の処理
document.querySelector('#next').addEventListener('click', moveAfterCalendar)
function moveAfterCalendar(e) {
  document.querySelector('#calendar').innerHTML = ''
    month++

  if (month > 12) {
    // 12月より後にいった場合の処理
    year++
    month = 1
  }

  showCalendar(year, month)
}

showCalendar(year, month)

// 今日の日にちを曜日を表示
document.querySelector('#today').innerHTML = '<p class="today-week">' + todayWeek + '</p>' +
'<p class="current-day">' + day + '</p>'

document.getElementById("setDate").onchange = function() {
  // inputで選択した年月にカレンダーを移動させる処理
  const date = document.getElementById("setDate").value;
  const dateString = date.split("-")
  const month = Number(dateString[1]) - 1
  const year = Number(dateString[0])
  showCalendar(year, month);
}

// Before Day または After Day を選択した時に下部に文字を表示する
const answerText = document.getElementById("answer")
const answerForDate = document.getElementById("answerNum")

function before(){
  // Before Dayを選択した場合の処理
  answerText.innerHTML = "days bofore."

  document.getElementById("setDate").onchange = function() {
    // inputで日付を選択するとその日が今日から何日前かを表示する
    const date = document.getElementById("setDate").value;
    const dateString = date.split("-")
    const day = Number(dateString[2])
    const month = Number(dateString[1]) - 1
    const year = Number(dateString[0])
    const answerSetTime = new Date(year, month, day)
    const answerMsec = today.getTime() - answerSetTime.getTime()
    const answerDate = Math.floor(answerMsec / (1000 * 60 * 60 * 24))
    showCalendar(year, month);
    answerForDate.innerHTML = answerDate
  }
}
function after(){
  answerText.innerHTML = "days after."

  document.getElementById("setDate").onchange = function() {
    // inputで日付を選択するとその日が今日から何日前かを表示する
    const date = document.getElementById("setDate").value;
    const dateString = date.split("-")
    const day = Number(dateString[2])
    const month = Number(dateString[1]) - 1
    const year = Number(dateString[0])
    const answerSetTime = new Date(year, month - 1, day)
    const answerMsec = answerSetTime.getTime() - today.getTime()
    const answerDate = Math.floor(answerMsec / (1000 * 60 * 60 * 24))
    showCalendar(year, month);
    answerForDate.innerHTML = answerDate
  }
}