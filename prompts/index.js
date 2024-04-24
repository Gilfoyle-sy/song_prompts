import prompts from 'prompts'
import servers from './devOptions.js'

const initChoice = (obj) => {
  return Object.entries(obj).map(([title, options]) => {
    return {
      title,
      description: `http://${options.host}:${options.port}`,
      value: options,
    }
  })
}


// 人员较少时的单选
const selectQuestions = (obj) => {
  return {
    type: 'select',
    name: 'server',
    message: '选择服务配置',
    choices: initChoice(obj)
  }
}

// 人员较多时的单选，可输入过滤
const autocompleteQuestions = (obj) => {
  return {
    type: 'autocomplete',
    name: 'server',
    message: '请选择服务配置，可输入筛选，未选择时使用locahost',
    initial: 1,
    limit: 5,
    suggest: (input, choices) => choices.filter(i => i.title.toLowerCase().includes(input.toLowerCase())),
    choices: initChoice(obj),
    fallback: {
      title: '未找到相关配置',
      value: 'error'
    },
  }
}

export const serverPrompts = async () => {
  // const response = await prompts(selectQuestions(servers))
  const response = await prompts(autocompleteQuestions(servers))
  console.log(response);
  return response.server
}
