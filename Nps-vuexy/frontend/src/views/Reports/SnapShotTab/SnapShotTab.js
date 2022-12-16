import React from 'react';
import { Card, Col, Row } from 'reactstrap';
import DonutChart from './DonutChart';

import SnapShotTabBarChart from './Barchart';
import Table from './Table';
const SnapShotTab = () => {
	return (
		<>
			<hr />
			{/* <Row style={{ justifyContent: 'space-evenly' }}> */}
			<div
				style={{
					width: '99%',
					margin: '0 auto',
				}}
			>
				<div style={{ display: 'flex' }}>
					<Col md="5" sm="5" style={{ marginTop: '10px' }}>
						<DonutChart />
					</Col>
					<Col md="7" sm="7">
						{/* <DonutChart /> */}
						<SnapShotTabBarChart />
					</Col>
				</div>
				<hr />
			</div>
			{/* 	<div className="divider divider-secondary">
				<div className="divider-text"></div>
			</div> */}
			<div
				style={{
					marginTop: '30px',
				}}
			>
				<div style={{ display: 'flex' }}>
					<Col md="5" sm="5" style={{ marginTop: '10px' }}>
						<h3 className="thin report-snapshot-data-heading text-center">
							Score Breakdown
						</h3>
						<Table />
					</Col>
					<Col md="7" sm="7">
						<div className="span-12 last">
							<div className="report-snapshot-data-responses">
								<h3 className="thin report-snapshot-data-heading text-center">
									A few responses for this period
								</h3>
								<ul className="ajax-updatable">
									<li className="report-snapshot-data-response">
										<div className="survey-response-standalone">
											<div className="survey-response-standalone-smiley">
												<div className="is-passive-passive is-score-only smiley">
													<div className="smiley-face"></div>
													<div className="smiley-score">
														7
													</div>
												</div>
											</div>
											<div className="survey-response-standalone-content-comment">
												<div className="survey-response-standalone-content-comment-display">
													<div
														className="survey-response-standalone-content-comment-display-comment"
														dir="auto"
													>
														<p>
															Ordering
															from
															the
															app
															is
															super
															easy,
															and
															your
															search
															feature
															is
															fantastic,
															love
															being
															able
															to
															see
															everything
															by
															color.
															However,
															the
															confirmation
															email
															said
															it
															would
															arrive
															on
															Friday,
															but
															it
															didn’t
															come
															until
															Wednesday
															the
															following
															week.
															If
															you
															are
															going
															to
															offer
															free
															shipping
															make
															sure
															it
															arrives
															on
															time.
														</p>
													</div>
												</div>
											</div>
											<div className="survey-response-standalone-content-score"></div>
										</div>
									</li>
									<li className="report-snapshot-data-response">
										<div className="survey-response-standalone">
											<div className="survey-response-standalone-smiley">
												<div className="is-promoter-promoter is-score-only smiley">
													<div className="smiley-face"></div>
													<div className="smiley-score">
														10
													</div>
												</div>
											</div>
											<div className="survey-response-standalone-content-comment">
												<div className="survey-response-standalone-content-comment-display">
													<div
														className="survey-response-standalone-content-comment-display-comment"
														dir="auto"
													>
														<p>
															When
															I
															shop
															online
															I end
															up
															returning
															half
															of
															the
															stuff
															I
															order,
															so
															it’s
															always
															nice
															when
															I can
															come
															into
															the
															store
															to
															make
															sure
															I
															love
															the
															color
															and
															fit.
															The
															staff
															is
															always
															really
															friendly
															and
															totally
															understands
															you
															gotta
															try
															on a
															lot
															of
															stuff
															to
															find
															the
															perfect
															piece.
														</p>
													</div>
												</div>
											</div>
											<div className="survey-response-standalone-content-score"></div>
										</div>
									</li>
								</ul>
							</div>
						</div>
					</Col>
				</div>
			</div>
			{/* </Row> */}
		</>
	);
};

export default SnapShotTab;
