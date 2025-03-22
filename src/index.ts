import { Context, Schema, h } from 'koishi'
import 'koishi-plugin-skia-canvas'
export const name = 'codeforces-card'

export interface Config {}

export const Config: Schema<Config> = Schema.object({})

export const inject = ['canvas']

interface CodeforcesUser {
  rating: number
  friendOfCount: number
  titlePhoto: string
  handle: string
  rank: string
  maxRating: number
  maxRank: string
  lastOnlineTimeSeconds: number
}

const getLogoBase64String = () => {
  return `data:image/png;base64,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`
}
// 根据 rank 获取颜色
function getRankColor(rank: string): { main: string, light: string } {
  const colors = {
    'newbie': { main: '#808080', light: '#a0a0a0' },
    'pupil': { main: '#008000', light: '#6FBE5C' },
    'specialist': { main: '#03A89E', light: '#6DCFC9' },
    'expert': { main: '#0000FF', light: '#7875FC' },
    'candidate master': { main: '#AA00AA', light: '#CD68CD' },
    'master': { main: '#FF9223', light: '#FFB965' },
    'international master': { main: '#FF6419', light: '#ffa040' },
    'grandmaster': { main: '#FF5445', light: '#FF8484' },
    'international grandmaster': { main: '#FF0000', light: '#FF5547' },
    'legendary grandmaster': { main: '#FF0000', light: '#510000' }
  }
  return colors[rank.toLowerCase()] || colors['newbie']
}

// 格式化时间
function formatDate(date: Date): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  return `${year}-${month}-${day} ${hours}:${minutes}`
}

// 计算用户的过题数量
function calculateSolvedProblems(submissions: any[]): number {
  const solvedSet = new Set<string>();
  
  submissions.forEach(submission => {
    if (submission.verdict === 'OK') {
      const problemKey = `${submission.problem.contestId}-${submission.problem.index}`;
      solvedSet.add(problemKey);
    }
  });
  
  return solvedSet.size;
}

export function apply(ctx: Context) {
  ctx.command("cf <username>")
    .action(async ({ session }, username) => {
      try {
        // 获取用户信息
        const response = await ctx.http.get(`https://codeforces.com/api/user.info?handles=${username}&checkHistoricHandles=false`)
        const submissionList = await ctx.http.get(`https://codeforces.com/api/user.status?handle=${username}`)
        if (response?.status !== 'OK' || submissionList?.status !== 'OK') {
          console.log(response)
          return `嗯，用户想让我生成${username}的cf卡片，但是没有查找到这个人的cf信息喵QAQ`
        }

        const user: CodeforcesUser = response.result[0]
        const solvedCount = calculateSolvedProblems(submissionList.result)
        
        // 获取头像图片
        const avatarBuffer = await ctx.http.get(user.titlePhoto, { responseType: 'arraybuffer' })
        const logoBase64 = getLogoBase64String()
        const logo = await ctx.canvas.loadImage(logoBase64)

        // 创建透明背景的画布
        const canvas = await ctx.canvas.createCanvas(750, 500)
        const ctx2d = canvas.getContext('2d')

        // 绘制信息卡片（带圆角的矩形和渐变）
        const colors = getRankColor(user.rank)
        const gradient = ctx2d.createLinearGradient(0, 75, 675, 500)
        gradient.addColorStop(0, colors.main)
        gradient.addColorStop(1, colors.light)
        
        ctx2d.fillStyle = gradient
        ctx2d.beginPath()
        ctx2d.roundRect(0, 75, 415, 425, 20)
        ctx2d.roundRect(0, 335, 675, 165, 20)
        
        ctx2d.moveTo(415, 335);           // 创建开始点
        ctx2d.lineTo(430,335);          // 创建水平线
        ctx2d.arcTo(415,335,415,315,20); // 创建弧
        ctx2d.fill()

        // 绘制头像（右上角，部分超出卡片）
        const avatar = await ctx.canvas.loadImage(avatarBuffer)
        ctx2d.save()

        
        ctx2d.beginPath()
        ctx2d.roundRect(0, 75, 675, 425, 20)
        ctx2d.clip()
        ctx2d.globalAlpha = 0.1  // 设置透明度
        // 计算保持原比例的尺寸
        ctx2d.drawImage(avatar, 0, 200)
        ctx2d.globalAlpha = 1  // 恢复透明度
        ctx2d.restore()

        // 绘制头像（右上角，带透明边框）
        ctx2d.save()
        // 再绘制头像

        ctx2d.beginPath()
        ctx2d.roundRect(425, 0, 325, 325, 20)
        ctx2d.clip()
        ctx2d.drawImage(avatar, 425, 0, 325, 325)
        ctx2d.restore()

        // 绘制用户等级和用户名（检查文字宽度）
        ctx2d.fillStyle = '#ffffff'
        ctx2d.font = 'bold 36px'
        const rankText = user.rank.charAt(0).toUpperCase() + user.rank.slice(1)
        const rankWidth = ctx2d.measureText(rankText).width
        if (rankWidth > 380) {  // 如果文字太长，缩小字体
            ctx2d.font = `bold ${Math.floor(36 * 380 / rankWidth)}px`
        }
        ctx2d.fillText(rankText, 30, 135)

        ctx2d.font = 'bold 72px'
        const handleWidth = ctx2d.measureText(user.handle).width
        if (handleWidth > 380) {  // 如果文字太长，缩小字体
            ctx2d.font = `bold ${Math.floor(72 * 380 / handleWidth)}px`
        }
        ctx2d.fillText(user.handle, 30, 215)

        // 绘制 Contest Rating
        ctx2d.fillStyle = '#ffffff'
        ctx2d.font = 'bold 28px'
        ctx2d.fillText('Contest Rating', 450, 365)
        ctx2d.font = 'bold 82px'
        ctx2d.fillText(user.rating.toString(), 460, 445)

        // 绘制其他信息（左下角）
        ctx2d.font = '26px'
        ctx2d.fillStyle = '#ffffff'
        ctx2d.fillText(`Friend Of: ${user.friendOfCount}`, 30, 370)
        ctx2d.fillText(`Max Rating: ${user.maxRating}`, 30, 400)
        ctx2d.fillText(`Solved Problems: ${solvedCount}`, 30, 430)

        // 绘制 Codeforces logo
        ctx2d.drawImage(logo, 30, 440)

        // 绘制创建时间
        ctx2d.font = '12px'
        ctx2d.fillStyle = 'rgba(255, 255, 255, 0.5)'
        const timeText = formatDate(new Date())
        const timeWidth = ctx2d.measureText(timeText).width
        ctx2d.fillText(timeText, 650 - timeWidth, 475)

        // 将画布转换为图片并发送
        const buffer = await canvas.toBuffer('image/png')
        return h.image(buffer, 'image/png')
      } catch (error) {
        console.error("error=======>",error)
        return '输入的用户名好像不存在🤔或者可能cf炸了🥵请稍后再试喵~'
      }
    })
}
