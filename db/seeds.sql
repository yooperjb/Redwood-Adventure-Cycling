INSERT INTO Routes (id, name, mileage, elevation, points, first_bonus, difficulty, map, note)

VALUES ('2784001562258115506','Bald Mountain Loop',26.2,3490,20,5,'Moderate','bald_mountain.jpg','A great scenic loop, with more than half of the ride dirt miles. Although this route could be completed on a road bike, a cross or gravel bike is highly recommended.'),
('2784168196717416004','Coastal Trail Loop',12.7,1350,15,5,'Moderate','coastal_trail.jpg','This is a shorter fun loop that travels along a section of the Coastal Trail from Prairie Creek State Park. Check out Radar Station B-71 along the way. '),
('2784184062301119044','Grasshopper Lookout Loop',	16.2,3700,30,5,'Hard','grasshopper.jpg','This a gnarly ride up to the Grasshopper Fire Lookout with almost two miles with grades over 20%! Mountain bike gearing is highly recommended. The views on top are worth it, with a fun ride down the Hanson Ridge MUT, albeit a little more climbing. 
'),
('2784195612081198920','Lassic Loop',29.7,3600,20,	5,'Moderate','lassic.jpg','Great loop in a rarely used area in the Mount Lassic Wilderness. I would recommend riding the loop counter-clockwise, taking the nice, steady grade up to the Lassic Peaks. If you have time, the hike out to Signal Peak is short and has excellent views of the area.'),
('2784172091679252296','Little Bald Hills Loop',17.3,2500,20,5,'Moderate','little_bald_hills.jpg','Great mountain bike loop starting and ending in Jedediah Smith Redwood State Park. The ride starts off with a five mile climb which can be pretty steep in some sections, but the views are well worth it. The trail descends down to the Paradise Trail just above South Fork Road. Ride South Fork Rd. eight miles back to the trailhead.
'),
('2784188125345719112','Look Prairie - Peavine Loop',12.7,3000,15,5,'Moderate','look_prairie.jpg','This is a fun, non-technical mountain bike loop with a steep initial climb up the Look Prairie MUT. The climb is about found miles long with some steep sections better than 20%. It traverses Peavine Ridge along the Peavine MUT, then descends down the Thorton MUT through Albee Campground.'),
('2783998850999951282','Lostaggon',41.2,4900,30,5,'Moderate','lostaggon.jpg','This route is a link up of the Lost Man Creek Trail and the Ossagon Trails (hence the name Lostaggon) in Redwood National Park. The route is a great mix of road, dirt, and single track through old growth Redwood Forest. For the nimble a gravel bike works great.'),
('2784008411748899762','Paradise Royale/ Pacific Rim',12,2610,15,5,'Moderate','paradise_pacific_rim.jpg','This route combines both the Pacific Rim and Paradise Royale trails into a loop. I prefer to ride the Pacific Rim in a counter-clockwise direction starting from Low Gap, and then Paradise Royale clockwise from Low Gap.'),
('2784162068290964036','Ship Mountain - French Hill Loop',44.8,7400,40,5,'Hard','ship_mountain.jpg','Incredible loop ride in the Smith River Recreation area with the option to visit two fire lookouts in one ride! There is a tough ten mile climb with some steep grades up to Ship Mountain Lookout, but the views are worth it!
'),
('2783602419957350566','Showers Pass Loop',75.26,12320,50,5,'Epic','showers_pass.jpg','A quintessential Humboldt County bike ride, this ride is epic. With over 12 thousand feet of climbing on mostly gravel roads, be prepared for a long day. Take plenty of food and water, and a camera for all the amazing views.');

INSERT INTO User (id, access_token, refresh_token, name, sex)
VALUES (76136910, '3dfce762d6166ab8405d94659328f432899bcb74', 'f69003d0b936888a2aa79c3b352c16d4d954074f', 'Danielle Branton', 'F'),
(76196481, '3346a36870464f11b2243ec5221b980bd2ac8c18', '19295ceb7e0e758df30a94e84940af05a69a1e0a', 'Calista Mayer', 'F'),
(76136989, '6033733a654c6f879f141419767eb0aa0d809981', '5fef0ab0df34e2d3c8d891aae0882f1ab770a03a', 'Ant Kieu', 'M');

INSERT INTO User_Routes (ride_time, ride_link, date_completed, user_id, route_id)
VALUES
('06:00', 'Google.com', '2021-01-20', '76136989', '2784001562258115506'
),
('01:16', 'https://www.strava.com/athletes/76136910', '2021-01-22', '76136910', '2784162068290964036'
),
('01:17', 'https://www.strava.com/athletes/76136910', '2021-01-22', '76136910', '2784188125345719112'
);