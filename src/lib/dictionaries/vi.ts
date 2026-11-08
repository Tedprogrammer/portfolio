import type { Dictionary } from "./en";

// Draft Vietnamese copy. Have a native speaker review before relying on it.
const vi: Dictionary = {
  site: {
    name: "Luong Hieu Trinh",
    title: "Luong Hieu Trinh | Sinh viên Kỹ thuật Cơ điện tử",
    description:
      "Các dự án kỹ thuật, kinh nghiệm và công việc chuyên môn của Luong Hieu Trinh, sinh viên ngành cơ điện tử tại RMIT.",
  },
  header: {
    skipToContent: "Chuyển đến nội dung",
    primaryNavigation: "Điều hướng chính",
    about: "Giới thiệu",
    projects: "Dự án",
    experience: "Kinh nghiệm",
    skills: "Kỹ năng",
    contact: "Liên hệ",
  },
  languageSwitch: {
    label: "Ngôn ngữ",
    en: { short: "EN", name: "English" },
    vi: { short: "VI", name: "Tiếng Việt" },
  },
  hero: {
    eyebrow: "Sinh viên kỹ thuật cơ điện tử",
    intro:
      "Tôi là sinh viên kỹ thuật cơ điện tử tại RMIT, làm việc trên nhiều lĩnh vực: thiết kế sản phẩm, gia công chế tạo, điện tử và phần mềm.",
    exploreWork: "Khám phá dự án",
  },
  about: {
    eyebrow: "01 / Giới thiệu",
    heading: "Kết nối nhiều lĩnh vực",
    body: "Tôi thích biến ý tưởng thành sản phẩm thực tế, từ CAD và gia công CNC đến robot, thiết kế PCB và phần mềm. Trang web này ghi lại các dự án và kinh nghiệm thực tế đằng sau những công việc đó.",
    portraitAlt: "Ảnh chân dung Luong Hieu Trinh",
  },
  projects: {
    eyebrow: "02 / Dự án",
    heading: "Dự án tiêu biểu",
    empty: "Chưa có dự án nào được đăng.",
  },
  experience: {
    eyebrow: "03 / Kinh nghiệm",
    heading: "Học qua thực hành",
    intro:
      "Việc học và kinh nghiệm làm việc giúp tôi kết nối lý thuyết kỹ thuật với thiết kế sản phẩm, gia công CNC, hệ thống số và chế tạo mẫu thử.",
    education: {
      label: "Học vấn",
      degree: "Cử nhân Kỹ thuật",
      program: "Sản xuất Tiên tiến và Cơ điện tử, Đại học RMIT",
      period: "07/2025 – 06/2029",
      summary:
        "Các môn học gồm toán cao cấp, thiết kế kỹ thuật, kỹ thuật điện – điện tử và nền tảng kỹ thuật số. Tôi tham gia Advanced RMIT Competitive Robotics, RUASRT và RMIT Rover Payload, đồng thời là thành viên của Engineers Australia.",
    },
    roles: [
      {
        period: "05/2026 – Hiện tại",
        role: "Thực tập sinh Thiết kế Sản phẩm",
        organization: "ElectraWireless",
        location: "Làm việc từ xa",
        summary:
          "Thiết kế thiết bị nhà bếp không dây bằng SolidWorks, ứng dụng nguyên lý truyền năng lượng không dây và phối hợp với nhóm điện để chuẩn bị sản phẩm cho sản xuất và lắp ráp.",
      },
      {
        period: "12/2025 – Hiện tại",
        role: "Tình nguyện viên Hỗ trợ CNTT và Hệ thống Số",
        organization: "VoteGuard International Ltd.",
        location: "Claymore, NSW",
        summary:
          "Quản trị website WordPress của tổ chức, xử lý sự cố email, hosting và DNS, đồng thời hỗ trợ quản lý tệp trên đám mây và các quy trình an ninh mạng.",
      },
      {
        period: "11/2025 – 02/2026",
        role: "Nhân viên Vận hành Máy CNC",
        organization: "Point Precision Engineering Pty Ltd.",
        location: "Nunawading, VIC",
        summary:
          "Tích lũy kinh nghiệm thực tế trong quy trình gia công CNC, chế tạo một sản phẩm bằng SolidWorks và Mastercam, đồng thời học các kỹ thuật sản xuất chính xác và lắp ráp.",
      },
      {
        period: "06/2022 – Hiện tại",
        role: "Vận hành Bán lẻ và Chăm sóc Khách hàng",
        organization: "Simon Oz, Queen Victoria Market",
        location: "Melbourne, VIC",
        summary:
          "Quản lý hàng tồn kho, bổ sung hàng hóa, trưng bày sản phẩm và chăm sóc khách hàng trong môi trường bán lẻ đông khách.",
      },
    ],
    leadership: {
      period: "01/2024 – 08/2025",
      role: "Trưởng ban Tổ chức Giải đấu và Sự kiện",
      organization: "Lãnh đạo Giải đấu và Gây quỹ IB CAS",
      summary:
        "Tổ chức các giải cờ vua và cầu lông cho hơn 100 người tham gia, điều phối hậu cần và tình nguyện viên, đồng thời quyên góp được khoảng 1.000 AUD cho các tổ chức từ thiện địa phương.",
    },
  },
  skills: {
    eyebrow: "04 / Kỹ năng",
    heading: "Kỹ năng kỹ thuật",
    intro:
      "Những năng lực thực tế được rèn luyện qua các môn học kỹ thuật, kinh nghiệm làm việc, các đội robot và dự án thực hành.",
    groups: {
      design: {
        title: "CAD & thiết kế sản phẩm",
        skills: [
          "SolidWorks",
          "AutoCAD",
          "Onshape",
          "Shapr3D",
          "Blender",
          "Thiết kế cơ khí",
        ],
      },
      manufacturing: {
        title: "Gia công & chế tạo mẫu",
        skills: [
          "Mastercam",
          "Gia công CNC",
          "In 3D",
          "Cắt laser",
          "Chi tiết chính xác",
          "Lắp ráp cơ khí",
        ],
      },
      electronics: {
        title: "Điện tử & robot",
        skills: [
          "KiCad",
          "Thiết kế PCB",
          "Đi dây robot",
          "Chế tạo mẫu khung gầm",
          "Hệ thống cơ điện",
          "Truyền năng lượng không dây",
        ],
      },
      programming: {
        title: "Lập trình & hệ thống số",
        skills: [
          "C",
          "C++",
          "Python",
          "MATLAB",
          "HTML & CSS",
          "WordPress",
          "GitHub",
          "Xử lý sự cố CNTT",
        ],
      },
      leadership: {
        title: "Lãnh đạo & vận hành",
        skills: [
          "Lãnh đạo sự kiện",
          "Lập kế hoạch hậu cần",
          "Điều phối tình nguyện viên",
          "Gây quỹ",
          "Quản lý hàng tồn kho",
          "Chăm sóc khách hàng",
          "Phối hợp liên nhóm",
        ],
      },
    },
  },
  contact: {
    eyebrow: "05 / Liên hệ",
    heading: "Cùng tạo ra điều gì đó hữu ích.",
    intro:
      "Bạn có dự án, vị trí tuyển dụng hoặc ý tưởng hợp tác? Hãy gửi email trực tiếp cho tôi hoặc kết nối với tôi trên mạng.",
    labels: {
      email: "Email",
      linkedin: "LinkedIn",
      github: "GitHub",
      phone: "Điện thoại",
    },
  },
  resume: {
    open: "Xem CV",
    title: "Luong Hieu Trinh - CV (tiếng Anh)",
    pages: "1 trang",
    close: "Đóng bản xem trước CV",
    openPdf: "Mở PDF",
    download: "Tải xuống",
    openInNewTab: "Mở CV dạng PDF trong thẻ mới",
    previewAlt: "Bản xem trước CV của Luong Hieu Trinh",
  },
  project: {
    breadcrumb: "Đường dẫn",
    projects: "Dự án",
    untranslated: "Bài viết này hiện chỉ có bằng tiếng Anh.",
  },
  og: {
    homeTagline: "Kỹ thuật cơ điện tử · RMIT",
    projectTagline: (year: string) => `Dự án · ${year} · Luong Hieu Trinh`,
  },
};

export default vi;
