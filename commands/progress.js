// ~progress @role <taskname>: lists the progress of all the people with the role assigned that task
// ~progress @role: lists the progress of all the people with the role along with all their ongoing indiv tasks
// ~progress @user: lists the progress of the tasks currently assigned
// ~progress @user <taskname>: lists the progress of the task specified
// ~progress @user -a: lists the task history of the user

module.exports = {
  name: 'progress',
  aliases: ['taskprogress'],
  usage: '@role/@user (optional) [task name]',
  description: 'Shows the progress of a specific task',
  execute (message, args) {
    message.channel.send('A lot of progress but not getting anywhere :)')

    const users = message.mentions.users
    const assignees_id = new Array()
    for (const user of users) {
      const user_copy = user.slice()
      assignees_id.push(user_copy.shift())
    }

    let taskName = ''
    const lenArgs = args.length
    for (let i = lenArgs - 1; i >= 0; i--) {
      const word = args[i]
      if (!word.startsWith('<')) {
        taskName = word + ' ' + taskName
      } else {
        taskName = taskName.trim()
        break
      }
    }

    const assignerId = message.author.id

    // console.log(assignees_id);
    // console.log("-----------------");
    // console.log(assignerId);
    // console.log("-----------------");
    // console.log(taskName);

    message.mentions.users.map(user => {
      user.send(taskName + '\n\n**Assigned by:** <@' + message.author + '>', {
        split: true
      })
        .then(() => {
          if (message.channel.type !== 'dm') {
            message.channel.send('I\'ve assigned and sent <@' + user + '> the task.')
          }
        })
        .catch(() => message.reply('Something went wrong on <@' + user + '>\'s end :('))
    })

    let user = ''

    if (message.mentions.users.first() == null) {
      user = message.author
    } else {
      user = message.mentions.users.first()
    }
  }
}
