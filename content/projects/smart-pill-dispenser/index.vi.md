---
title: "Hộp chia thuốc thông minh"
description: "Thiết bị nhắc uống thuốc dùng ESP32, kết hợp hộp chia thuốc bảy ngày, lập lịch theo thời gian thực và nhắc nhở đồng thời bằng hình ảnh và âm thanh."
date: "2026-05-14"
cover: "https://raw.githubusercontent.com/Tedprogrammer/smart_pill_dispenser/da188f07ac50476c572e933633502aa4873d5466/images/lcd_test.jpg"
coverAlt: "Hình ảnh mạch LCD đấu dây trên breadboard"
---

Việc nhớ uống thuốc thường dễ bị xem là hiển nhiên. Tuy nhiên, với người lớn tuổi mắc chứng sa sút trí tuệ, một lời nhắc bị bỏ lỡ hoặc một ký ức không chắc chắn có thể dẫn đến việc quên liều hoặc uống cùng một loại thuốc hai lần. Tôi đã xây dựng Smart Pill Dispenser như một thiết bị nhắc nhở vật lý: hiển thị rõ ngày hiện tại, thu hút sự chú ý khi đến giờ uống thuốc và chờ người dùng xác nhận đã uống.

Dự án gộp thiết kế cơ khí, sản xuất cộng (in 3D), điện tử và phần mềm nhúng vào một nguyên mẫu duy nhất. Toàn bộ tệp thiết kế, firmware, các bài kiểm tra linh kiện và mô phỏng Wokwi đều có trong [kho GitHub Smart Pill Dispenser](https://github.com/Tedprogrammer/smart_pill_dispenser).

## Thiết kế hộp chia thuốc xoay quanh một tuần

Tôi bắt đầu từ chính vật mà người dùng sẽ cầm trên tay: một hộp chia thuốc hình tròn được chia thành bảy ngăn hướng tâm. Mỗi ngày có một ngăn riêng giúp thao tác trở nên trực tiếp. Khi có lời nhắc, một trong bảy đèn LED sẽ chỉ vào ngày tương ứng, thay vì bắt người dùng đọc menu hay nhớ xem thuốc được cất ở đâu.

Vỏ hộp được mô hình hóa thành một cụm lắp ráp nhiều chi tiết trong SolidWorks. Hình cắt cho phép tôi kiểm tra hình học của các ngăn thuốc và khoang bên dưới dành cho việc tích hợp điện tử sau này, trước khi quyết định in. Kho mã nguồn có sẵn [tệp SolidWorks gốc và cụm lắp ráp STEP có thể dùng trên nhiều phần mềm](https://github.com/Tedprogrammer/smart_pill_dispenser/tree/da188f07ac50476c572e933633502aa4873d5466/CAD/solidworks).

[![Ảnh dựng SolidWorks của hộp chia thuốc hình tròn bảy ngăn](https://raw.githubusercontent.com/Tedprogrammer/smart_pill_dispenser/da188f07ac50476c572e933633502aa4873d5466/CAD/renders/assembly_1.png)](https://github.com/Tedprogrammer/smart_pill_dispenser/blob/da188f07ac50476c572e933633502aa4873d5466/CAD/renders/assembly_1.png)

**Ảnh dựng cụm lắp ráp.** Bảy ngăn hình cái nêm sắp xếp cả tuần quanh tâm của vỏ hộp.

[![Hình cắt cho thấy các ngăn thuốc phía trên khoang vỏ bên dưới](https://raw.githubusercontent.com/Tedprogrammer/smart_pill_dispenser/da188f07ac50476c572e933633502aa4873d5466/CAD/renders/section_view.png)](https://github.com/Tedprogrammer/smart_pill_dispenser/blob/da188f07ac50476c572e933633502aa4873d5466/CAD/renders/section_view.png)

**Hình cắt.** Việc tách khay thuốc khỏi khoang bên dưới mở ra hướng đặt bộ điều khiển, hệ thống nguồn và dây dẫn vào bên trong ở bản lắp ráp cuối cùng.

Bản vỏ in đầu tiên biến mô hình CAD thành thứ tôi có thể cầm lên đánh giá bằng tay. Nó xác nhận bố cục hướng tâm và làm lộ ra những câu hỏi thực tế chỉ xuất hiện ở nguyên mẫu vật lý, chẳng hạn như khả năng đọc nhãn, việc tiếp cận từng ngăn và không gian dành cho việc tích hợp.

[![Hộp chia thuốc in 3D đầu tiên màu tím với các ngăn có nhãn theo thứ trong tuần](https://raw.githubusercontent.com/Tedprogrammer/smart_pill_dispenser/da188f07ac50476c572e933633502aa4873d5466/images/3d_printed_v1.jpg)](https://github.com/Tedprogrammer/smart_pill_dispenser/blob/da188f07ac50476c572e933633502aa4873d5466/images/3d_printed_v1.jpg)

**Bản in đầu tiên.** Các nhãn thứ trong tuần gắn bảy ngõ ra của firmware với hộp chia thuốc thực tế.

## Xây dựng hệ thống nhắc nhở

Một vi điều khiển ESP32 điều phối toàn bộ nguyên mẫu. Module đồng hồ thời gian thực DS1302 cung cấp ngày và giờ, màn hình LCD 16x2 giao tiếp I2C hiển thị trạng thái hiện tại, bảy đèn LED chỉ ra ngăn đang được nhắc và một còi buzzer thụ động bổ sung tín hiệu âm thanh. Một nút nhấn cho người dùng đúng một thao tác rõ ràng: xác nhận đã uống thuốc và tắt lời nhắc.

Tôi gán chức năng cho từng thiết bị ngoại vi trước khi tích hợp, để LCD, đồng hồ, bảy đèn báo, còi và nút nhấn có thể cùng hoạt động trên ESP32. [Sơ đồ chân](https://github.com/Tedprogrammer/smart_pill_dispenser/blob/da188f07ac50476c572e933633502aa4873d5466/hardware/pin_mapping.md) thu được giữ phần quy ước phần cứng ngay cạnh firmware.

[![Sơ đồ đấu dây hệ thống cho ESP32, bảy đèn LED, LCD, còi, nút nhấn và đồng hồ thời gian thực](https://raw.githubusercontent.com/Tedprogrammer/smart_pill_dispenser/da188f07ac50476c572e933633502aa4873d5466/images/system_wiring_diagram.png)](https://github.com/Tedprogrammer/smart_pill_dispenser/blob/da188f07ac50476c572e933633502aa4873d5466/images/system_wiring_diagram.png)

**Kế hoạch đấu dây hệ thống.** Sơ đồ tập hợp các ngõ vào và ngõ ra quanh ESP32 trước khi tích hợp vào vỏ hộp.

Thay vì đấu dây toàn bộ hệ thống cùng lúc, tôi đưa từng hệ thống con vào hoạt động lần lượt: nguồn USB, đèn LED, còi, nút nhấn, đồng hồ thời gian thực và cuối cùng là LCD. Các sketch Arduino nhỏ trong [bộ kiểm tra linh kiện](https://github.com/Tedprogrammer/smart_pill_dispenser/tree/da188f07ac50476c572e933633502aa4873d5466/firmware/component_tests) giúp cô lập lỗi dễ hơn so với việc gỡ lỗi cả hệ thống như một mạch duy nhất.

[![Nguyên mẫu ESP32 trên breadboard với màn hình LCD và một hàng bảy đèn LED](https://raw.githubusercontent.com/Tedprogrammer/smart_pill_dispenser/da188f07ac50476c572e933633502aa4873d5466/images/breadboard_setup.jpg)](https://github.com/Tedprogrammer/smart_pill_dispenser/blob/da188f07ac50476c572e933633502aa4873d5466/images/breadboard_setup.jpg)

**Tích hợp trên breadboard.** Bộ điều khiển, màn hình và các đèn báo ngày cùng nằm trên một nguyên mẫu để bàn trước khi được đóng gói vào vỏ hộp.

[![Bài kiểm tra LCD hiển thị dòng chữ sẵn sàng hệ thống bên cạnh breadboard ESP32](https://raw.githubusercontent.com/Tedprogrammer/smart_pill_dispenser/da188f07ac50476c572e933633502aa4873d5466/images/lcd_test.jpg)](https://github.com/Tedprogrammer/smart_pill_dispenser/blob/da188f07ac50476c572e933633502aa4873d5466/images/lcd_test.jpg)

**Kiểm tra màn hình.** Một sketch riêng kiểm chứng độc lập giao tiếp I2C và giao diện trạng thái hai dòng.

[![Một đèn LED ngày sáng lên khi kiểm tra các ngõ ra nhắc nhở của ESP32](https://raw.githubusercontent.com/Tedprogrammer/smart_pill_dispenser/da188f07ac50476c572e933633502aa4873d5466/images/led_test.jpg)](https://github.com/Tedprogrammer/smart_pill_dispenser/blob/da188f07ac50476c572e933633502aa4873d5466/images/led_test.jpg)

**Kiểm tra đèn báo.** Việc chạy thử từng ngõ ra riêng biệt đã xác minh ánh xạ giữa firmware và bảy ngày vật lý.

## Biến lịch trình thành một tương tác rõ ràng

[Firmware ESP32 chính](https://github.com/Tedprogrammer/smart_pill_dispenser/blob/da188f07ac50476c572e933633502aa4873d5466/firmware/system_code_v1/smart_pill_dispenser.ino) mô hình hóa ba liều mỗi ngày: sáng, trưa và tối. Mỗi mục gồm giờ, nhãn và số viên thuốc. Vòng lặp điều khiển đọc đồng hồ, đối chiếu ngày và phút hiện tại với lịch trình đó, đồng thời theo dõi những liều đã được xác nhận.

Đến giờ đã đặt, tương tác diễn ra qua bốn trạng thái:

1. LCD hiển thị liều thuốc và số viên.
2. Đèn LED của ngày hiện tại trong tuần sáng lên ngay lập tức.
3. Sau một khoảng ngắn chỉ có tín hiệu hình ảnh, còi bắt đầu kêu ngắt quãng cho đến khi lời nhắc được xác nhận.
4. Nhấn nút sẽ tắt cả hai ngõ ra và đánh dấu liều đó là đã uống trong phiên hiện tại.

Phần còi và việc làm mới màn hình dùng cách tính thời gian dựa trên `millis()` thay vì các lệnh delay chặn kéo dài. Nhờ vậy bộ điều khiển vẫn tiếp tục kiểm tra nút nhấn và cập nhật giao diện trong lúc báo thức đang chạy. Tôi cũng tạo một [bản demo rút gọn 20 giây](https://github.com/Tedprogrammer/smart_pill_dispenser/tree/da188f07ac50476c572e933633502aa4873d5466/prototype_demo) để kiểm tra trọn vẹn hành trình đếm ngược, báo thức và xác nhận mà không phải chờ đến giờ uống thuốc thật.

## Nguyên mẫu đã chứng minh điều gì

Dự án đạt được một nguyên mẫu tương tác hoạt động được, gồm hộp chia thuốc in 3D, mạch điện tử trên breadboard, các sketch kiểm tra từng linh kiện và firmware nhắc nhở đã tích hợp. Nó cho thấy một sự kiện theo lịch có thể chọn đúng ngày, hiển thị liều thuốc trên LCD, thu hút sự chú ý bằng ánh sáng và âm thanh, đồng thời ghi nhận việc xác nhận bằng nút nhấn.

Dự án cũng xác định các ưu tiên kỹ thuật tiếp theo. Hiện tại, bản ghi xác nhận chỉ nằm trong RAM, nên cần lưu trữ bền vững để thiết bị giữ được lịch sử uống thuốc sau khi khởi động lại. Lịch trình đang được biên dịch cứng vào firmware và cần trở nên có thể cấu hình. Để tích hợp hoàn chỉnh, vẫn cần đóng gói mạch điện tử và phần cứng sạc pin dự kiến vào bên trong vỏ hộp, sau đó kiểm chứng khả năng sử dụng và độ tin cậy trên thiết bị đã lắp ráp.

Kết quả quan trọng nhất là một lộ trình có thể lặp lại, đi từ nhu cầu của con người đến một tương tác vật lý: sắp xếp thuốc theo ngày, làm cho hành động tiếp theo hiển nhiên và xác nhận rằng lời nhắc đã được xử lý. [Khám phá toàn bộ mã nguồn, CAD và tài liệu trên GitHub](https://github.com/Tedprogrammer/smart_pill_dispenser).
