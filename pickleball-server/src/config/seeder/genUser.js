import {
  adventurer,
  avataaars,
  bigEars,
  bigSmile,
  croodles,
  micah,
  openPeeps,
  pixelArt,
} from "@dicebear/collection";
import { createAvatar } from "@dicebear/core";

const styles = [
  adventurer,
  avataaars,
  bigEars,
  bigSmile,
  croodles,
  micah,
  openPeeps,
  pixelArt,
];

import mongoose from 'mongoose';
import { User } from '../../api/models/index.js';
const lastNames = [
  'Nguyễn','Trần','Lê','Phạm','Hoàng','Huỳnh','Phan','Vũ','Võ','Đặng',
  'Bùi','Đỗ','Hồ','Ngô','Dương','Lý','Trịnh','Đoàn','Cao','Mai','Tạ',
  'Tô','Châu','Quách','Lâm','Kiều','Thái','Trương'
];

const middleNamesMale = ['Văn','Hữu','Minh','Anh','Quốc','Đức','Đình','Gia','Trung','Ngọc','Khánh'];
const middleNamesFemale = ['Thị','Ngọc','Thuỳ','Thanh','Phương','Bích','Diệu','Mai','Lan','Xuân','Ánh'];

const firstNamesMale = [
  'Anh','Bình','Châu','Duy','Đạt','Hải','Hiếu','Hòa','Hùng','Huy','Khanh','Khôi',
  'Long','Nam','Nghĩa','Phong','Phúc','Quân','Quang','Sơn','Tâm','Tân','Thắng','Thành',
  'Thiên','Thiện','Trí','Trung','Trường','Tú','Tùng','Việt'
];
const firstNamesFemale = [
  'Lan','Linh','Loan','Ly','Mai','Minh','My','Nga','Ngân','Ngọc','Nhi','Nhiên','Như','Nhung',
  'Phương','Quyên','Thảo','Thi','Thúy','Trang','Trinh','Vy','Yến','Hạnh','Hoa','Hồng','Nguyệt'
];

const provinces = [
  { province: 'Hà Nội', code: 'VN-HN', bbox: { lat:[20.8,21.4], lon:[105.6,106.0] }, districts:['Ba Đình','Hoàn Kiếm','Đống Đa','Thanh Xuân','Cầu Giấy'] },
  { province: 'Hải Phòng', code: 'VN-HP', bbox:{ lat:[20.6,20.9], lon:[106.5,107.1]}, districts:['Hồng Bàng','Lê Chân','Ngô Quyền'] },
  { province: 'Quảng Ninh', code: 'VN-13', bbox:{ lat:[20.7,21.6], lon:[106.9,108.1]}, districts:['Hạ Long','Cẩm Phả','Uông Bí'] },
  { province: 'Nam Định', code: 'VN-67', bbox:{ lat:[19.9,20.4], lon:[106.0,106.5]}, districts:['Nam Trực','Mỹ Lộc','Xuân Trường'] },
  { province: 'Thái Nguyên', code: 'VN-69', bbox:{ lat:[21.4,21.8], lon:[105.5,106.1]}, districts:['Phổ Yên','Sông Công','Đại Từ'] },
  { province: 'Đà Nẵng', code: 'VN-DN', bbox:{ lat:[15.9,16.2], lon:[107.9,108.4]}, districts:['Hải Châu','Thanh Khê','Sơn Trà'] },
  { province: 'Thừa Thiên Huế', code: 'VN-26', bbox:{ lat:[16.2,16.8], lon:[107.2,107.9]}, districts:['Huế','Hương Thủy','Hương Trà'] },
  { province: 'Quảng Nam', code: 'VN-27', bbox:{ lat:[15.3,16.1], lon:[107.7,108.6]}, districts:['Tam Kỳ','Hội An','Điện Bàn'] },
  { province: 'Khánh Hòa', code: 'VN-34', bbox:{ lat:[11.6,12.6], lon:[108.7,109.5]}, districts:['Nha Trang','Cam Lâm','Cam Ranh'] },
  { province: 'Nghệ An', code: 'VN-22', bbox:{ lat:[18.5,19.5], lon:[104.5,105.5]}, districts:['Vinh','Cửa Lò','Nam Đàn'] },
  { province: 'Hồ Chí Minh', code: 'VN-SG', bbox:{ lat:[10.5,11.2], lon:[106.3,106.9]}, districts:['Quận 1','Quận 3','Quận 7','Bình Thạnh','Thủ Đức'] },
  { province: 'Cần Thơ', code: 'VN-CT', bbox:{ lat:[9.9,10.2], lon:[105.5,105.9]}, districts:['Ninh Kiều','Bình Thủy','Cái Răng'] },
  { province: 'Bình Dương', code: 'VN-57', bbox:{ lat:[10.8,11.4], lon:[106.5,106.9]}, districts:['Thủ Dầu Một','Thuận An','Dĩ An'] },
  { province: 'Đồng Nai', code: 'VN-39', bbox:{ lat:[10.6,11.4], lon:[106.8,107.5]}, districts:['Biên Hòa','Long Khánh','Nhơn Trạch'] },
  { province: 'An Giang', code: 'VN-44', bbox:{ lat:[10.3,10.8], lon:[104.7,105.5]}, districts:['Long Xuyên','Châu Đốc','Tân Châu'] },
];

function randomOf(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
function randomCoord([min, max]) { return +(min + Math.random() * (max - min)).toFixed(6); }
function toSlug(str) {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g,'')
    .replace(/đ/g,'d').replace(/Đ/g,'D')
    .toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'');
}

function makeVietnamAddress() {
  const p = randomOf(provinces);
  const district = randomOf(p.districts);
  return {
    province: p.province,
    district,
    lat: randomCoord(p.bbox.lat),
    lon: randomCoord(p.bbox.lon),
    code: p.code
  };
}

function makeVietnameseName() {
  const gender = Math.random() < 0.5 ? 'male' : 'female';
  const last = randomOf(lastNames);
  const mid = gender === 'male' ? randomOf(middleNamesMale) : randomOf(middleNamesFemale);
  const first = gender === 'male' ? randomOf(firstNamesMale) : randomOf(firstNamesFemale);
  return { full: `${last} ${mid} ${first}`, gender };
}

const PASSWORD = '123456789a'; // add one letter to satisfy validator
const EMAIL_DOMAIN = 'example.vn';

const randomPhone = () => {
  const prefixes = ['03', '05', '07', '08', '09'];
  const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
  return prefix + Math.floor(10000000 + Math.random() * 90000000).toString();
};

// function generateAvatarUrl(name, gender) {
//   const id = Math.floor(Math.random() * 100); // 0–99
//   // Use gender field if available, fallback random
//   const g = gender === 'male' ? 'men' : gender === 'female' ? 'women' : (Math.random() > 0.5 ? 'men' : 'women');
//   return `https://randomuser.me/api/portraits/${g}/${id}.jpg`;
// }

export function getAvatar(userName) {
  // Pick a random style
  const randomStyle = styles[Math.floor(Math.random() * styles.length)];

  const avatar = createAvatar(randomStyle, {
    seed: userName, // same seed → consistent result
    size: 128,
    backgroundColor: ["b6e3f4", "c0aede", "d1d4f9"],
  });

  return avatar.toString();
}
function generateUsers(n = 1000) {
  const users = [];
  const emailSet = new Set();

  for (let i = 0; i < n; i++) {
    const name = makeVietnameseName();
    const slug = toSlug(name.full);
    const addr = makeVietnamAddress();

    // ensure unique email
    let emailBase = `${slug}.${i}`; // include index for determinism
    let email = `${emailBase}@${EMAIL_DOMAIN}`;
    let k = 1;
    while (emailSet.has(email)) {
      email = `${emailBase}.${k}@${EMAIL_DOMAIN}`;
      k++;
    }
    emailSet.add(email);

    users.push({
      name: name.full,
      email,
      gender: name.gender,
      password: PASSWORD,
      role: 'user',
      isVerifiedEmail: true,
      images: {
        avatar: getAvatar(name.full)
      },
      contact: {
        facebook: `https://facebook.com/${slug}.${i}`,
        zalo: `https://zalo.me/${randomPhone()}`,
        phone: randomPhone()
      },
      courts: [],
      marketItems: [],
      location: {
        isShowLocation: true,
        type: "Point",
        coordinates: [ addr.lon, addr.lat ],
        displayName: `${addr.district}, ${addr.province}`,
        address: {
          city: addr.city,
          district: addr.district,
          country: 'Vietnam',
          country_code: 'vn',
          'ISO3166-2-lvl4': addr.code,
          postcode: '', road: '', suburb: '', quarter: '', amenity: '', office: '', house_number: ''
        },
        selectedLocation: {
          province: addr.province,
          district: addr.district,
          detailAddress: ''
        }
      },
      isDeleted: false
    });
  }
  return users;
}

const keepEmails = [
    "gaaravu0@gmail.com",
    "gaaravu1@gmail.com",
    "vu9huy.workspace.1@gmail.com",
];

function getRandomLevel() {
  const steps = (6 - 2) / 0.5 + 1; // total possible values
  const randomStep = Math.floor(Math.random() * steps); // pick index
  return 2 + randomStep * 0.5;
}

function getRandomStatus() {
  return Math.random() < 0.5 ? "online" : "offline";
}

async function deleteAllExceptKeepEmails() {
    try {
        const result = await User.deleteMany({
        email: { $nin: keepEmails },
        });
        console.log(`Deleted ${result.deletedCount} users`);
    } catch (err) {
        console.error("Error deleting users:", err);
    }
}


async function updateUserData() {
    try {

      const users = await User.find({}, { _id: 1 }); // only fetch ids

      const bulkOps = users.map((user) => ({
        updateOne: {
          filter: { _id: user._id },
          update: { $set: { level: getRandomLevel(), status: getRandomStatus() } }, // only updates "level"
        },
      }));

      if (bulkOps.length > 0) {
        await User.bulkWrite(bulkOps);
        console.log(`Updated ${bulkOps.length} users with random levels.`);
      }
      
    } catch (error) {
      console.error("updateUserData:", error);
    }
}

// --- If you want to INSERT into MongoDB:
async function genUsers() {
    const uri = "mongodb://127.0.0.1:27017/pickleball";
    await mongoose.connect(uri);

    // const docs = generateUsers(2000);
    // const result = await User.insertMany(docs, { ordered: false });
    // console.log(`Inserted ${result.length} users`);
    
    // await deleteAllExceptKeepEmails()

    // await updateUserData()

    await mongoose.disconnect();
}

// genUsers()
